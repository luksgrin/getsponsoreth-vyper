import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import DatabaseViewer from '~~/components/DatabaseViewer';
import databaseData from '~~/data/database.json';
import { ContractData } from "~~/components/example-ui/ContractData";
import { ContractInteraction } from "~~/components/example-ui/ContractInteraction";

const BrowsePleadges: NextPage = () => {
  return (
    <>
      <MetaHeader
        title="Browse Pledges | GetSponsorETH"
        description="Example UI created with 🏗 Scaffold-ETH 2, showcasing some of its features."
      >
      </MetaHeader>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-4xl font-bold">Browse proposals</span>
            <span className="block text-2xl mb-2">Check out cool projects to sponsor!</span>
          </h1>
          <DatabaseViewer data={databaseData} />
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
          </div>
        </div>
      </div>
    </>
  );
};

export default BrowsePleadges;
