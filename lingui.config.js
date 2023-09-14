const { locales } = require("./src/locales/locales.json");
import { formatter } from "@lingui/format-po";

module.exports = {
  locales,
  catalogs: [
    {
      path: "<rootDir>/src/locales/{locale}/messages",
      include: ["<rootDir>/src/"],
      exclude: ["/node_modules/", "/.next/"],
    },
  ],
  format: formatter({ lineNumbers: false }),
  compileNamespace: "cjs",
  sourceLocale: "de",
  fallbackLocales: {
    default: "de",
  },
};
