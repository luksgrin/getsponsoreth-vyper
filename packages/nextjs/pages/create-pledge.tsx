import Link from "next/link";
import type { NextPage } from "next";
import SubmissionForm from '../components/create-pledge/SubmissionForm';
import { MetaHeader } from "~~/components/MetaHeader";

const CreatePledge: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-4xl font-bold">New proposal</span>
            <span className="block text-2xl mb-2">Create your own pledge proposal and get your own sponsor!</span>
          </h1>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <SubmissionForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePledge;
