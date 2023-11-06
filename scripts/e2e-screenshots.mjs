import { chromium, devices } from "playwright";
import { breakpoints } from "@interactivethings/swiss-federal-ci";

const main = async () => {
  const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000";
  const browser = await chromium.launch({
    headless: !!process.env.CI,
  });

  // List of pages to visit
  const routes = ["/analysis", "/methods", "/data", "/"];

  for (const route of routes) {
    const pageName = route === "/" ? "home" : route.replace("/", ""); // Name for the screenshot file

    const pageContext = await browser.newContext({
      ...devices["Desktop 1920x1080"], // Set an initial viewport size
    });

    const page = await pageContext.newPage();
    await page.goto(`${baseURL}${route}`);

    for (const [name, width] of Object.entries(breakpoints)) {
      // Set viewport size for the current breakpoint
      await page.setViewportSize({
        width: width + (name === "xl" || name === "xxl" || name === "xxxl" ? 2 * 16 : 0),
        height: 1080,
      });

      // Take a screenshot and save it with page name and breakpoint name
      const screenshotPath = `screenshots/${pageName}-${name}.png`; // You can adjust the path as needed
      await page.screenshot({ path: screenshotPath });

      console.log(`Screenshot taken: ${screenshotPath}`);
    }

    await pageContext.close();
  }

  await browser.close();
};

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
