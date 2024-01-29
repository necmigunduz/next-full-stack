import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
interface IssueDetailProps {
  id: string;
  title: string;
  description: string;
  status: string;
};

function IssueDetail() {
  const params = useParams();
  const { id } = params;
  const [issue, setIssue] = useState<IssueDetailProps>({});
  const getIssue = async (id: string | string[]) => {
    try {
      const response = await axios.get("/api/issues");
      const issue = response?.data.find(
        (obj: { id: any }) => String(obj.id) === String(id)
      );
      setIssue(issue);
    } catch (error) {
      console.error("Error fetching issues:", error);
    }
  };
  useEffect(() => {
    getIssue(id);
  }, [id]);

  return (
    <div>
      <h1 className="font-bold text-lg">Title: </h1> <p>{issue.title}</p>
      <h2 className="font-bold text-base">Description: </h2> <p>{issue.description}</p>
      <span className="font-bold text-xs">Status: {issue.status}</span>
    </div>
  );
}

export default IssueDetail;
