import "isomorphic-unfetch";
import { NextApiHandler } from "next";

import { POWER_BI_CLIENT_ID, POWER_BI_CLIENT_SECRET, POWER_BI_TENANT_ID } from "@/domain/env";

const ACCESS_TOKEN_URL = `https://login.microsoftonline.com/${POWER_BI_TENANT_ID}/oauth2/v2.0/token`;
const SCOPE = "https://analysis.windows.net/powerbi/api/.default";
const API_URL = "https://api.powerbi.com/v1.0/myorg/GenerateToken";

const handler: NextApiHandler = async (req, res) => {
  const { method } = req;

  if (method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${method} Not Allowed` });

    return;
  }

  if (!(POWER_BI_CLIENT_ID && POWER_BI_CLIENT_SECRET && POWER_BI_TENANT_ID)) {
    console.error("Missing required environment variables");
    res.status(500).json({ message: "Something went wrong!" });

    return;
  }

  try {
    const { datasets, reports } = JSON.parse(req.body);

    if (!(datasets && reports)) {
      console.error(req.body);
      throw Error("Missing required body parameters");
    }

    const accessTokenResult = await fetch(ACCESS_TOKEN_URL, {
      method: "POST",
      body: new URLSearchParams({
        grant_type: "client_credentials",
        scope: SCOPE,
        client_id: POWER_BI_CLIENT_ID,
        client_secret: POWER_BI_CLIENT_SECRET,
      }),
    }).then((res) => res.json());

    if (!accessTokenResult.access_token) {
      console.error(accessTokenResult);
      throw Error("Couldn't get access token");
    }

    const embedCodeResult = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessTokenResult.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ datasets, reports }),
    }).then((res) => res.json());

    if (!embedCodeResult.token) {
      console.error(embedCodeResult);
      throw Error("Couldn't get embed code");
    }

    // if (process.env.NODE_ENV === "development") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    // }
    res.status(200).json(embedCodeResult);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export default handler;
