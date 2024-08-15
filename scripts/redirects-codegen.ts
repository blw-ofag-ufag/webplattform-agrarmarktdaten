import fs from "node:fs";
import * as GQL from "../src/graphql";
import { client } from "../src/graphql/api";
import { locales } from "../src/locales/locales";

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
      url: "/methods/glossary",
      alternates: result.data.method?._allSlugLocales?.map(({ value, locale }) => {
        const glossaryLocale = result.data?.glossaryPage?._allSlugLocales?.find(
          (slug) => slug.locale === locale
        )?.value;
        return `/${value}/${glossaryLocale}`;
      }),
    },
    {
      url: "/methods/[slug]",
      alternates: result.data.method?._allSlugLocales?.map(({ value }) => `/${value}`),
    },
    {
      url: "/data",
      alternates: result.data.dataPage?._allSlugLocales?.map(({ value }) => `/${value}`),
    },
    {
      url: "/legal",
      alternates: result.data.legalPage?._allSlugLocales?.map(({ value }) => `/${value}`),
    },
    {
      url: "/terms-and-conditions",
      alternates: result.data.termsPage?._allSlugLocales?.map(({ value }) => `/${value}`),
    },
    {
      url: "/about-us",
      alternates: result.data.aboutUsPage?._allSlugLocales?.map(({ value }) => `/${value}`),
    },
    {
      url: "/info",
      alternates: result.data.infoPage?._allSlugLocales?.map(({ value }) => `/${value}`),
    },
    {
      url: "/analysis",
      alternates: result.data.analysisPage?._allSlugLocales?.map(({ value }) => `/${value}`),
    },
    {
      url: "/focus/[slug]",
      alternates: result.data.focusModel?._allSlugLocales?.map(({ value }) => `/${value}`),
    },
    {
      url: "/market/[slug]",
      alternates: result.data.market?._allSlugLocales?.map(({ value }) => `/${value}`),
    },
  ];

  const slugs = locales.map((locale) => ({
    locale,
    slugs: {
      glossary: result.data?.glossaryPage?._allSlugLocales?.find((slug) => slug.locale === locale),
      methods: result.data?.method?._allSlugLocales?.find((slug) => slug.locale === locale)?.value,
      data: result.data?.dataPage?._allSlugLocales?.find((slug) => slug.locale === locale)?.value,
      legal: result.data?.legalPage?._allSlugLocales?.find((slug) => slug.locale === locale)?.value,
      terms: result.data?.termsPage?._allSlugLocales?.find((slug) => slug.locale === locale)?.value,
      aboutUs: result.data?.aboutUsPage?._allSlugLocales?.find((slug) => slug.locale === locale)
        ?.value,
      info: result.data?.infoPage?._allSlugLocales?.find((slug) => slug.locale === locale)?.value,
      analysis: result.data?.analysisPage?._allSlugLocales?.find((slug) => slug.locale === locale)
        ?.value,
      focus: result.data?.focusModel?._allSlugLocales?.find((slug) => slug.locale === locale)
        ?.value,
      market: result.data?.market?._allSlugLocales?.find((slug) => slug.locale === locale)?.value,
    },
  }));

  try {
    if (!fs.existsSync(DIR)) {
      fs.mkdirSync(DIR, { recursive: true });
    }
    await Bun.write(`${DIR}/redirects.json`, JSON.stringify(redirects, null, 2));
    await Bun.write(`${DIR}/slugs.json`, JSON.stringify(slugs, null, 2));
  } catch (e) {
    console.error("Error writing to file", e);
  }
};

run();
