"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Issue from "./issue";

interface IssueData {
  title: string;
  description: string;
  id: number;
  status: string; // Assuming 'status' is a property of the Issue
}

const IssuePage = () => {
  const [issues, setIssues] = useState<IssueData[]>([]);

  const getIssues = async () => {
    try {
      const response = await axios.get("/api/issues");
      console.log("RES", response.data);
      setIssues(response.data as IssueData[]);
    } catch (error) {
      console.error("Error fetching issues:", error);
    }
  };

  useEffect(() => {
    getIssues();
  }, []);

  return (
    <div>
      {issues.map((issue) => (
        <Issue
          key={issue.id}
          title={issue.title}
          description={issue.description}
          issueId={issue.id}
          status={issue.status}
        />
      ))}
    </div>
  );
};

export default IssuePage;
