import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { nanoid } from "nanoid";

import { db } from "../../utils/db";
import checkCsrf from "../../utils/checkCsrf";

const jwt_secret = process.env.JWT_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!checkCsrf(req, res)) return;

  const user = await getToken({ req, secret: jwt_secret });

  if (req.method === "POST") {
    try {
      const { className, classSubject } = req.body;

      if (user && className && classSubject) {
        if (user.role !== "teacher") {
          return res.status(400).json({ error: true, msg: "Not authorized" });
        }

        await db.query(
          "INSERT INTO classes (class_id, name, subject, teacher_id) VALUES ($1, $2, $3, $4)",
          [nanoid(), className, classSubject, user.sub]
        );
        return res.json({ success: true });
      } else {
        return res.status(400).json({ error: true, msg: "Invalid request" });
      }
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        error: true,
        msg: "There was an error creating class",
      });
    }
  }

  if (req.method === "GET") {
    if (user) {
      if (user.role === "teacher") {
        const { rows } = await db.query(
          "SELECT * FROM classes WHERE teacher_id = $1",
          [user.sub]
        );
        return res.json({
          classes: rows,
        });
      }

      if (user.role === "student") {
      }
    }
  }

  if (req.method === "PUT") {
    return res.json({ id: 1 });
  }
}
