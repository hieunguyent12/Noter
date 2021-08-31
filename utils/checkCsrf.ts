import type { NextApiRequest, NextApiResponse } from "next";

export default function checkCsrf(req: NextApiRequest, res: NextApiResponse) {
  if (!req.headers["x-requested-with"]) {
    res.status(400).json({ error: true, msg: "Invalid request" });
    return false;
  }

  return true;
}
