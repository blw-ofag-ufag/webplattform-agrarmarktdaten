import { chromium, devices } from "playwright";
import { b } from "@interactivethings/swiss-federal-ci";

const sleep = (duration) => new Promise((resolve) => setTimeout(resolve, duration));

const main = async () => {
  const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000";
  const browser = await chromium.launch({
    headless: !!process.env.CI,
    timeout: 50000,
  });

  // List of pages to visit
  const routes = [
    { route: "/analysis", fullPage: false },
    { route: "/methods/methoden-fur-milch-und-milchprodukte", fullPage: false },
    { route: "/legal", fullPage: false },
    { route: "/markt/milch-und-milchprodukte", fullPage: true },
    { route: "/", fullPage: true },
  ];

  for (const { route, fullPage } of routes) {
    const pageName = route === "/" ? "home" : route.replace("/", ""); // Name for the screenshot file

    const pageContext = await browser.newContext({
      ...devices["Desktop 1920x1080"], // Set an initial viewport size
    });

    const page = await pageContext.newPage();
    await page.goto(`${baseURL}${route}`);

    //xxs starts at 0 so we need to exclude it
    delete b.values.xxs;
    for (const [name, width] of Object.entries(b.values)) {
      // Set viewport size for the current breakpoint
      await page.setViewportSize({
        width: width + (name === "xl" || name === "xxl" || name === "xxxl" ? 2 * 16 : 0),
        height: 1080,
      });

      await Promise.race([sleep(10 * 1000), page.waitForLoadState("networkidle")]);

      // Take a screenshot and save it with page name and breakpoint name
      const screenshotPath = `screenshots/${pageName}-${name}.png`; // You can adjust the path as needed
      await page.screenshot({
        path: screenshotPath,
        fullPage,
        animations: "disabled",
        mask: [page.locator(".powerbi-embed")],
      });

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
