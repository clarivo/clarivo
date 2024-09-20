import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import { db } from "./lib/drizzle/db";

export const {
	handlers: { GET, POST },
	signIn,
	signOut,
	auth,
} = NextAuth({
	secret: process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET,
	adapter: DrizzleAdapter(db),
	pages: {
		signIn: "/login",
		signOut: "/",
		error: "/login",
	},
	providers: [
		Google({
			clientId: process.env.AUTH_GOOGLE_ID,
			clientSecret: process.env.AUTH_GOOGLE_SECRET,
		}),
		Github({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
	],
});