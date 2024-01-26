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
      <p><span className="text-lg font-extrabold">TITLE:</span> {title}</p>
      <h2>DESCRIPTION</h2>
      <p>{description}</p>
      <sup>Status: {status}</sup>
      <Link href={`/issues/${issueId}`}>
        <Text color="blue" as={"p"} >View Details</Text>
      </Link>
    </div>
  );
};

export default Issue;
