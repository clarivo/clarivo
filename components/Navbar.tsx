import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import { UserAccountNav } from "./user-account-nav";
import { auth } from "@/auth";

const Navbar = async () => {
  const session = await auth();
  const user = session?.user;

  return (
    <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 item-center justify-between border-b border-zinc-200">
          <Link href="/" className="flex items-center z-40 font-semibold ">
            Clarivo
          </Link>
          <div className="h-full flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  href="/app"
                  className="flex items-center z-40 font-semibold mr-10 "
                >
                  App
                </Link>
                <UserAccountNav
                  user={{
                    name: user?.name,
                    image: user?.image,
                    email: user?.email,
                  }}
                />
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  Sign in
                </Link>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
