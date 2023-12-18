import { match } from "ts-pattern";

export const IS_DEV_ENVIRONMENT = process.env.NODE_ENV === "development";
export const IS_PROD_ENVIRONMENT = process.env.NODE_ENV === "production";

export const POWER_BI_CLIENT_ID = process.env.POWER_BI_CLIENT_ID;
export const POWER_BI_CLIENT_SECRET = process.env.POWER_BI_CLIENT_SECRET;
export const POWER_BI_TENANT_ID = process.env.POWER_BI_TENANT_ID;

export const DATOCMS_API_URL = "https://graphql.datocms.com";
export const DATOCMS_API_TOKEN = process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN;
export const DATO_CMS_INCLUDE_DRAFTS = process.env.NEXT_PUBLIC_DATO_CMS_INCLUDE_DRAFTS;

export const DATOCMS_FULL_ACCESS_API_TOKEN = process.env.DATOCMS_FULL_ACCESS_API_TOKEN;

// Access the build trigger page to get the build trigger id at:
// https://blw-agricultural-market-data-platform.admin.datocms.com/project_settings/build_triggers/7249/edit
// Check the url for the actual id
export const getSearchBuildTrigger = (locale?: string) => {
  return match([process.env.NEXT_PUBLIC_VERCEL_ENV, locale])
    .with(["preview", "de"], () => 7249)
    .with(["preview", "fr"], () => 30850)
    .with(["preview", "it"], () => 30849)
    .with(["production", "de"], () => 30384)
    .with(["production", "fr"], () => 30824)
    .with(["production", "it"], () => 30825)
    .with(["development", "de"], () => 7249)
    .with(["development", "fr"], () => 30850)
    .with(["development", "it"], () => 30849)
    .with([undefined, "de"], () => 7249)
    .with([undefined, "fr"], () => 30850)
    .with([undefined, "it"], () => 30849)
    .otherwise(() => 7249);
};

export const getSearchBuildTriggerPerEnv = () => {
  return match(process.env.NEXT_PUBLIC_VERCEL_ENV)
    .with("production", () => [30384, 30824, 30825])
    .with("preview", () => [7249, 30850, 30849])
    .with("development", () => [7249, 30850, 30849])
    .otherwise(() => [7249, 30850, 30849]);
};

export const REINDEX_TOKEN = process.env.REINDEX_TOKEN;
export const ENV_TOKEN = process.env.ENV_TOKEN;
