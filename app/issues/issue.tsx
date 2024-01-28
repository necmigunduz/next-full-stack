import { capitalizeFirstLetter, capitalizeWords } from "@/utilize";
import { Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface IssueProps {
  title: string;
  description: string;
  status: string;
  issueId: number;
}
const Issue: React.FC<IssueProps> = ({ title, description, status, issueId }) => {
  return (
    <div className="border m-6 p-6 bg-slate-50 rounded-3xl">
      <p className="text-lg font-extrabold"> {capitalizeWords(title)}</p>
      <p><span className="font-bold">Description: </span> {capitalizeFirstLetter(description)}</p>
      <p><span className="font-bold">Status: </span> {status}</p>
      <Link href={`/issues/${issueId}`}>
        <Text color="blue" as={"p"} >View Details</Text>
      </Link>
    </div>
  );
};

export default Issue;
