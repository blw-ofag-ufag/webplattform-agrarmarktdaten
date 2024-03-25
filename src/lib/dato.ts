import { buildClient } from "@datocms/cma-client-browser";
import { DATOCMS_API_TOKEN } from "@/domain/env";

export const client = buildClient({ apiToken: DATOCMS_API_TOKEN ?? "", environment: "tables" });

export interface DatoSearch {
  type: "search_result";
  id: string;
  attributes: {
    title: string;
    body_excerpt: string;
    url: string;
    score: number;
    highlight: {
      title: string[];
      body: string[];
    };
  };
}
