import fs from "node:fs";
import * as GQL from "../src/graphql";
import { client } from "../src/graphql/api";

const DIR = "./src/generated";

const run = async () => {
  const result = await client
    .query<GQL.AllRedirectsQuery>(GQL.AllRedirectsDocument, {}, {})
    .toPromise();

  if (!result.data) {
    console.error(result.error?.toString());
    throw new Error("Failed to fetch API");
  }

  const redirects = [
    {
      url: "/methods",
      alternates: result.data.methodsPage?._allSlugLocales?.map(({ value }) => `/${value}`),
      locales: result.data.methodsPage?._allSlugLocales?.map(({ value, locale }) => ({
        locale,
        path: `/${value}`,
      })),
    },
    {
      url: "/data",
      alternates: result.data.dataPage?._allSlugLocales?.map(({ value }) => `/${value}`),
      locales: result.data.dataPage?._allSlugLocales?.map(({ value, locale }) => ({
        locale,
        path: `/${value}`,
      })),
    },
    {
      url: "/legal",
      alternates: result.data.legalPage?._allSlugLocales?.map(({ value }) => `/${value}`),
      locales: result.data.legalPage?._allSlugLocales?.map(({ value, locale }) => ({
        locale,
        path: `/${value}`,
      })),
    },
    {
      url: "/terms-and-conditions",
      alternates: result.data.termsPage?._allSlugLocales?.map(({ value }) => `/${value}`),
      locales: result.data.termsPage?._allSlugLocales?.map(({ value, locale }) => ({
        locale,
        path: `/${value}`,
      })),
    },
    {
      url: "/info",
      alternates: result.data.infoPage?._allSlugLocales?.map(({ value }) => `/${value}`),
      locales: result.data.infoPage?._allSlugLocales?.map(({ value, locale }) => ({
        locale,
        path: `/${value}`,
      })),
    },
    {
      url: "/analysis",
      alternates: result.data.analysisPage?._allSlugLocales?.map(({ value }) => `/${value}`),
      locales: result.data.analysisPage?._allSlugLocales?.map(({ value, locale }) => ({
        locale,
        path: `/${value}`,
      })),
    },
    {
      url: "/focus/[slug]",
      alternates: result.data.focusModel?._allSlugLocales?.map(({ value }) => `/${value}`),
      locales: result.data.focusModel?._allSlugLocales?.map(({ value, locale }) => ({
        locale,
        path: `/${value}`,
      })),
    },
    {
      url: "/market/[slug]",
      alternates: result.data.market?._allSlugLocales?.map(({ value }) => `/${value}`),
      locales: result.data.market?._allSlugLocales?.map(({ value, locale }) => ({
        locale,
        path: `/${value}`,
      })),
    },
  ];

  try {
    if (!fs.existsSync(DIR)) {
      fs.mkdirSync(DIR, { recursive: true });
    }
    await Bun.write(`${DIR}/redirects.json`, JSON.stringify(redirects, null, 2));
  } catch (e) {
    console.error("Error writing to file", e);
  }
};

run();
