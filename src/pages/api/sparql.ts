import { NextApiRequest, NextApiResponse } from "next";
import jsonpack from "jsonpack";
import { fetch } from "../../utils/sparql";

const serve = async (req: NextApiRequest, res: NextApiResponse) => {
  const options = req.body ? JSON.parse(req.body) : {};

  const endpointUrl = `${options.environment}/query`;

  res.setHeader("Content-type", "application/json");
  const data = await fetch(endpointUrl, options.query);
  const body = JSON.stringify(data);
  res.end(jsonpack.pack(body));
};

export default serve;
