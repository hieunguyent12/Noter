import NextAuth from "next-auth";

type Role = "student" | "teacher" | null;

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
   */
  interface Session {
    hasProvidedInfo: boolean;
    error?: boolean;
    role: Role;
    user_id: string | undefined;
  }

  interface User {
    role: Role;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    hasProvidedInfo: boolean;
    error?: boolean;
    role: Role;
  }
}
