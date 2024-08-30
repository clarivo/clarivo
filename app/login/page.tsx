import { Metadata } from "next";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { UserAuthForm } from "@/components/user-auth-form";
import { auth } from "@/auth";

export const runtime = 'edge';


export const metadata: Metadata = {
  title: "Login | Clarivo",
  description: "Login to your account",
};

export default async function Login() {
  const session = await auth();
  const user = session?.user;
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      {user && <pre>{JSON.stringify(user.email)}</pre>}
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.logo className="mx-auto h-6 w-6" /> {/*//! Add Icons.logo */}
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Continue with your account
          </p>
        </div>
        <UserAuthForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          By signing in, you agree to our{" "}
          <Link
            href="/terms"
            className="hover:text-brand underline underline-offset-4"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="hover:text-brand underline underline-offset-4"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}