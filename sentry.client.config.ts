// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

if (process.env.NODE_ENV !== "development") {
  Sentry.init({
    dsn: "https://8d285f2d1642cf44fbc542281daa9638@o65222.ingest.sentry.io/4506264067833856",

    // Adjust this value in production, or use tracesSampler for greater control
    tracesSampleRate: 1000,

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,

    replaysOnErrorSampleRate: 1.0,

    // This sets the sample rate to be 1%. You may want this to be 100% while
    // in development and sample at a lower rate in production
    replaysSessionSampleRate: 0.01,

    ignoreErrors: [
      // The ResizeObserver error is actually not problematic
      // @see https://forum.sentry.io/t/resizeobserver-loop-limit-exceeded/8402
      "ResizeObserver loop",
      // Coming apparently from Outlook
      // @see https://www.notion.so/interactivethings/Common-Sentry-Ignore-Rules-f0b1e94a6ac34ffd8d39b53498c48a45?pvs=4
      "Non-Error promise rejection captured",
    ]
  });
}
