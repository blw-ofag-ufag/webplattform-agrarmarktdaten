// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

if (process.env.NODE_ENV !== "development") {
  Sentry.init({
    dsn: "https://8d285f2d1642cf44fbc542281daa9638@o65222.ingest.sentry.io/4506264067833856",

    // Adjust this value in production, or use tracesSampler for greater control
    tracesSampleRate: 1000,

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,
  });
}
