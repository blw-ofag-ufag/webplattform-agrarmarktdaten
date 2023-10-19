export const DATOCMS_API_URL = "https://graphql.datocms.com";
export const DATOCMS_API_TOKEN =
  process.env.DATOCMS_API_TOKEN ?? process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN;
export const IS_DEV_ENVIRONMENT = process.env.NODE_ENV === "development";

export const POWER_BI_CLIENT_ID = process.env.POWER_BI_CLIENT_ID;
export const POWER_BI_CLIENT_SECRET = process.env.POWER_BI_CLIENT_SECRET;
export const POWER_BI_TENANT_ID = process.env.POWER_BI_TENANT_ID;
