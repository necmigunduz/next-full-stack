"use client";
import {
  Button,
  TextArea,
  TextField,
  Theme
} from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import React from "react";

const NewIssuePage = () => {
  return (
    <Theme
      appearance="light"
      accentColor="cyan"
      grayColor="gray"
      radius="full"
      className="max-w-xl space-y-3"
    >
      <h3>Create a new issue</h3>
      <TextField.Root>
        <TextField.Input placeholder="Title" />
        <br />
      </TextField.Root>
      <SimpleMDE placeholder="Enter your description of this issue..." />
      <Button>Submit New Issue</Button>
    </Theme>
  );
};

export default NewIssuePage;
