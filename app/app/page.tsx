import { auth } from "@/auth";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export const runtime = 'edge';


export default async function App() {
  const session = await auth();


  return (
    <div>
      <section>
        <MaxWidthWrapper className="pb-24 pt-10 sm:pb-30 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52 ">
          <div>
            <p>Welcome</p>
            <pre>{JSON.stringify(session?.user?.name)}</pre>
            <pre>{JSON.stringify(session?.user?.email)}</pre>
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}