const { withSentryConfig } = require("@sentry/nextjs");
const { IS_PROD_ENVIRONMENT } = require("./src/domain/env");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const withMDX = require("@next/mdx")();

const pkg = require("./package.json");

const VERSION = `v${pkg.version}`;

console.log("Version", VERSION);

const { locales, defaultLocale, domains, localDomains } = require("./src/locales/locales.json");

const config = withBundleAnalyzer(
  withMDX({
    // Build-time env variables
    env: {
      VERSION,
    },
    i18n: {
      locales,
      defaultLocale,
      domains: IS_PROD_ENVIRONMENT ? domains : localDomains,
      localeDetection: false,
    },

    transpilePackages: ["jotai-devtools"],

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
