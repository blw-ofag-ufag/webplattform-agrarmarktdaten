const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const withMDX = require("@next/mdx")();

const pkg = require("./package.json");

const VERSION = `v${pkg.version}`;

console.log("Version", VERSION);

const { locales, defaultLocale } = require("./src/locales/locales.json");

module.exports = withBundleAnalyzer(
  withMDX({
    // Build-time env variables
    env: {
      VERSION,
    },
    i18n: {
      locales,
      defaultLocale,
    },

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
