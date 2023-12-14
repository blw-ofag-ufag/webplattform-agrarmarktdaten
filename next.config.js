const { withSentryConfig } = require("@sentry/nextjs");
const {
  locales,
  defaultLocale,
  domains,
  previewDomains,
  localDomains,
} = require("./src/locales/locales.json");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const withMDX = require("@next/mdx")();
const { match } = require("ts-pattern");

const pkg = require("./package.json");

const VERSION = `v${pkg.version}`;

console.log("Version", VERSION);

const config = withBundleAnalyzer(
  withMDX({
    // Build-time env variables
    env: {
      VERSION,
    },
    i18n: {
      locales,
      defaultLocale,
      domains: match(process.env.NEXT_PUBLIC_VERCEL_ENV)
        .with("development", () => localDomains)
        .with("preview", () => previewDomains)
        .with("production", () => domains)
        .otherwise(() => localDomains),
      localeDetection: false,
    },

    /**
     * Jotai documentation recommends to transpile jotai-devtools, however
     * this causes an error, so we leave it out for now.
     */
    // transpilePackages: ["jotai-devtools"],

    pageExtensions: ["js", "ts", "tsx", "mdx"],

    images: {
      domains: ["www.datocms-assets.com"],
    },

    webpack(config, { dev, isServer, defaultLoaders }) {
      config.module.rules.push({
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: "graphql-tag/loader",
      });

      /* Enable source maps in production */
      if (!dev) {
        config.devtool = "source-map";

        for (const plugin of config.plugins) {
          if (plugin.constructor.name === "UglifyJsPlugin") {
            plugin.options.sourceMap = true;
            break;
          }
        }

        if (config.optimization && config.optimization.minimizer) {
          for (const plugin of config.optimization.minimizer) {
            if (plugin.constructor.name === "TerserPlugin") {
              plugin.options.sourceMap = true;
              break;
            }
          }
        }
      }

      return config;
    },
  })
);

// Injected content via Sentry wizard below

module.exports = withSentryConfig(
  config,
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,
    org: "interactive-things",
    project: "blw-agricultural-market-data-platform",
  },
  {
    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    tunnelRoute: "/monitoring",
    // Hides source maps from generated client bundles
    hideSourceMaps: true,
    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,
  }
);
