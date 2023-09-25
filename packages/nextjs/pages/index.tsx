import Link from "next/link";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">GetSponsorETH</span>
            <span className="block text-2xl mb-2"><code className="italic bg-base-300 text-base font-bold">vyper</code> edition</span>
          </h1>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <p>
                Get started by&nbsp;
                <Link href="/create-pledge" passHref className="link">
                creating a pledge
                </Link>{" "}
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <p>
                Check your created pledges&nbsp;
                <Link href="/browse-pledges" passHref className="link">
                  here
                </Link>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
