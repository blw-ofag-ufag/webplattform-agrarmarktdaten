import "isomorphic-unfetch";
import { NextApiRequest, NextApiResponse } from "next";

export default async function Report(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const ACCESS_TOKEN_URL =
    "https://login.windows.net/504534b7-7806-4629-b58a-be8ac1787473/oauth2/v2.0/token";
  const API_URL =
    "https://api.powerbi.com/v1.0/myorg/groups/c1cfad5e-d2bc-4ec0-a2d3-159a0042b43c/reports/cf816279-d5f4-46be-a838-2770dc61793b/GenerateToken";
  const CLIENT_ID = "3a0e9c6f-9241-44ee-b752-5d0f45ef3fb0";
  const CLIENT_SECRET = "tKn6QP_A6GGQD6V1Yqam=OEYVAqhM]r-";

  const SCOPE = "https://analysis.windows.net/powerbi/api/.default";

  try {
    const accessTokenResult = await fetch(ACCESS_TOKEN_URL, {
      method: "POST",
      body: new URLSearchParams({
        grant_type: "client_credentials",
        scope: SCOPE,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
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
      body: JSON.stringify({
        accessLevel: "View",
        identities: [
          {
            username: "PoC_PBIE",
            roles: ["read"],
            datasets: ["db4d01fb-b229-43b7-a8e6-8ce90fbb6e53"],
          },
        ],
      }),
    }).then((res) => res.json());

    if (!embedCodeResult.token) {
      console.error(embedCodeResult);
      throw Error("Couldn't get embed code");
    }

    res.status(200).json(embedCodeResult);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Something went wrong!" });
  }
}
