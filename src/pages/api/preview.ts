import { NextApiRequest, NextApiResponse } from "next";

export default function Preview(req: NextApiRequest, res: NextApiResponse) {
  res.setPreviewData({});
  res.json({
    message: "Preview Session Started",
  });
}
