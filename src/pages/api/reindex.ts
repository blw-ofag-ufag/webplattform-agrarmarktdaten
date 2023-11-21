import { buildClient } from "@datocms/cma-client-node";
import { DATOCMS_FULL_ACCESS_API_TOKEN, SEARCH_BUILD_TRIGGER, REINDEX_TOKEN } from "@/domain/env";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.query?.token !== REINDEX_TOKEN) {
    res.statusCode = 401;
    res.end(`Unauthorized.`);
    return;
  }
  if (DATOCMS_FULL_ACCESS_API_TOKEN && SEARCH_BUILD_TRIGGER) {
    const client = buildClient({ apiToken: DATOCMS_FULL_ACCESS_API_TOKEN });
    try {
      await client.buildTriggers.reindex(`${SEARCH_BUILD_TRIGGER}`);
      res.statusCode = 200;
      res.end(`Reindex in progress.`);
    } catch (e) {
      res.statusCode = 500;
      res.end(`Reindex not successful. = `, (e as $IntentionalAny).message);
    }
  }
}
