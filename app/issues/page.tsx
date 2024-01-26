"use client";
import axios from "axios";
import React, { useEffect } from "react";

const IssuePage = () => {
  const getIssues = async () => {
    const issues = await axios.get("/api/issues");
    console.log(issues);
  };

  useEffect(() => {
    getIssues();
  }, []);

  return <div>IssuePage</div>;
};

export default IssuePage;
