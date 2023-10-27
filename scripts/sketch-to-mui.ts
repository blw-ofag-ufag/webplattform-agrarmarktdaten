import path from "path";
import fs from "fs";

type EntryCallback<TValue, TOutput, TOutputKey> = (item: [string, TValue]) => [TOutputKey, TOutput];

const mapEntries = <TValue, TOutput, TOutputKey>(
  obj: Record<string, TValue>,
  entryCallback: EntryCallback<TValue, TOutput, TOutputKey>
) => {
  return Object.fromEntries(Object.entries(obj).map(entryCallback));
};

const main = () => {
  /**
   * The Sketch colors tokens file can be downloaded at
   * https://www.sketch.com/s/81803335-dd26-42f1-a505-6845270a91b7/color-variables
   * Then in the bottom left part of the screen, there is a button export color tokens.
   * It can then be saved at src/assets/sketch-color-tokens.json
   */
  const tokensPath = path.join(__dirname, "../src/assets/sketch-color-tokens.json");
  const colors = JSON.parse(fs.readFileSync(tokensPath).toString());
  const scale = colors.Base.Scale as Record<string, Record<string, { value: string }>>;
  const output = mapEntries(scale, ([name, sketchPalette]) => {
    const palette = {} as Record<string, string>;
    for (const [k, v] of Object.entries(sketchPalette)) {
      const isMain = k.indexOf("-P") > -1;
      const cleanKey = parseInt(
        k
          .replace(/(-|_)P/, "")
          .replace(/#.{6}/, "")
          .trim(),
        10
      );
      if (isMain) {
        palette.main = v.value;
      }
      palette[cleanKey] = v.value;
    }
    return [name.toLowerCase(), palette];
  });

  const outputPath = path.join(__dirname, "../src/assets/mui-color-tokens.json");
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
  console.log(`Generated ${outputPath} 🎉`);
};

main();
