import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import type { JWT } from "next-auth/jwt";

import { db } from "../../../utils/db";

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt(token, user, account, profile, isNewUser) {
      // console.log("jwt callback");
      // when sign in, we just assume that they haven't provided us any info
      if (isNewUser !== undefined) {
        token.hasProvidedInfo = false;
        token.role = null;
        // console.log(account);
      }

      try {
        // we check if the user has provided their info or not
        if (
          token.hasProvidedInfo !== undefined &&
          !token.hasProvidedInfo &&
          token.sub
        ) {
          const res = await db.query(`SELECT * FROM users WHERE id = $1`, [
            token.sub,
          ]);

          const user = res.rows[0];

          if (user && user.role && user.school) {
            token.hasProvidedInfo = true;
            token.role = user.role;
          }
        }
        return token;
      } catch (e) {
        console.log(e);
        token.error = true;
        return token;
      }
    },
    async session(session, token: JWT) {
      session.hasProvidedInfo = token.hasProvidedInfo;
      session.error = token.error;
      session.role = token.role;
      session.user_id = token.sub;

      return session;
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  database: process.env.DATABASE_URL,
});
