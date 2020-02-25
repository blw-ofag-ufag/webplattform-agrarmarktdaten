import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.clearPreviewData();
  res.json({
    message: "Preview Session Stopped"
  });
};
