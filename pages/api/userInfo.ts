import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "next-auth/jwt";

import { db } from "../../utils/db";

type Data = {
  success?: boolean;
  error?: boolean;
  msg?: string | null;
};

const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    try {
      const { role, school } = req.body;

      if (JWT_SECRET) {
        const decoded = await jwt.getToken({ req, secret: JWT_SECRET });

        if (
          decoded &&
          !decoded.hasProvidedInfo &&
          (role === "student" || role === "teacher")
        ) {
          await db.query(
            `UPDATE users SET role = $1, school = $2 WHERE id = $3`,
            [role, school, decoded.sub]
          );
        }
      } else {
        throw new Error("There was an error processing your info.");
      }

      res.json({ success: true });
    } catch (e) {
      res.json({ error: true, msg: e.message });
    }
  }
}
