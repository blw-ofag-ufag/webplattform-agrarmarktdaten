import { expect, it } from "vitest";

import { replaceNumberSeparators } from "@/domain/string";

it.skip("should replace big numbers", () => {
  const textWithBigNumbers = replaceNumberSeparators("1 000 000");
  expect(textWithBigNumbers).toBe("1 000 000");
});
