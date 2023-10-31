export const IS_DEV_ENVIRONMENT = process.env.NODE_ENV === "development";
export const IS_PROD_ENVIRONMENT = process.env.NODE_ENV === "production";

export const POWER_BI_CLIENT_ID = process.env.POWER_BI_CLIENT_ID;
export const POWER_BI_CLIENT_SECRET = process.env.POWER_BI_CLIENT_SECRET;
export const POWER_BI_TENANT_ID = process.env.POWER_BI_TENANT_ID;

export const DATOCMS_API_URL = "https://graphql.datocms.com";
export const DATOCMS_API_TOKEN = process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN;
export const DATO_CMS_INCLUDE_DRAFTS = process.env.NEXT_PUBLIC_DATO_CMS_INCLUDE_DRAFTS;

// Access the build trigger page to get the build trigger id at: https://blw-agricultural-market-data-platform.admin.datocms.com/project_settings/build_triggers/7249/edit
// Check the url for the actual id
export const SEARCH_BUILD_TRIGGER = IS_PROD_ENVIRONMENT ? 7249 : 30119;
