import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/lib/drizzle/db";
import NextAuth from "next-auth";
import { users } from "./lib/drizzle/schema";
import { eq } from "drizzle-orm";
import { Adapter } from "next-auth/adapters";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  adapter: DrizzleAdapter(db) as Adapter,
  session: {
    strategy: "database",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/login",
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID || "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET || "",
    }),
    Github({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      try {
        if (!account) {
          throw new Error("Account information is missing.");
        }

        const email = user.email;
        const provider = account.provider;

        if (!email) {
          throw new Error("User email is missing.");
        }

        const existingUser = await db
          .select()
          .from(users)
          .where(eq(users.email, email));

        if (existingUser && account.provider !== provider) {
          throw new Error(
            "Email is already associated with a different provider."
          );
        }

        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        throw new Error("Sign-in failed. Please try again.");
      }
    },
  },
});