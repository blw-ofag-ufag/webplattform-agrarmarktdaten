import { ENV_TOKEN } from "@/domain/env";
import { domains, previewDomains, localDomains } from "@/locales/locales.json";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.query?.token !== ENV_TOKEN) {
    res.statusCode = 401;
    res.end(`Unauthorized.`);
    return;
  }
  const isPreview =
    process.env.NEXT_PUBLIC_VERCEL_ENV === "preview" || process.env.IS_PREVIEW === "true";
  const currentDomains =
    process.env.NODE_ENV === "production" ? domains : isPreview ? previewDomains : localDomains;
  res.json({
    "process.env": process.env,
    isPreview,
    currentDomains,
  });
}
