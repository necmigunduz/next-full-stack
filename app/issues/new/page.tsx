"use client";
import { Button, TextArea, TextField, Theme } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import React from "react";
import { useRouter } from "next/navigation";
interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const submit = async (data: object) => {
    await axios.post("/api/issues", data).then((res) => console.log(res));
    router.push('/issues');
  };
  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit((data) => submit(data))}
    >
      <h3>Create a new issue</h3>
      <TextField.Root>
        <TextField.Input placeholder="Title" {...register("title")} />
        <br />
      </TextField.Root>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE
            placeholder="Enter your description of this issue..."
            {...field}
          />
        )}
      />

      <Button>Submit New Issue</Button>
    </form>
  );
};

export default NewIssuePage;
