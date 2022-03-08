const { locales } = require("./src/locales/locales.json");

module.exports = {
  locales,
  catalogs: [
    {
      path: "<rootDir>/src/locales/{locale}/messages",
      include: ["<rootDir>/src/"],
      exclude: ["/node_modules/", "/.next/"],
    },
  ],
  format: "po",
  compileNamespace: "cjs",
  sourceLocale: "de",
  fallbackLocales: {
    default: "de",
  },
};
