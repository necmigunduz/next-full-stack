import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@radix-ui/themes";
// Import the necessary styles for the Button component if needed

interface IssueDetailProps {
  id: string;
  title: string;
  description: string;
  status: string;
}

function IssueDetail() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const [issue, setIssue] = useState<IssueDetailProps>({});

  const getIssue = async (id: string | string[]) => {
    try {
      const response = await axios.get(`/api/issues?id=${id}`);
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

  const handleEdit = () => {
    router.push(`/issues/${id}/update`)
  };

  return (
    <div>
      <h1 className="font-bold text-lg">Title: </h1> <p>{issue.title}</p>
      <h2 className="font-bold text-base">Description: </h2>{" "}
      <p>{issue.description}</p>
      <span className="font-bold text-xs">Status: {issue.status}</span>
      <Button onClick={handleEdit}>Edit</Button>
    </div>
  );
}

export default IssueDetail;
