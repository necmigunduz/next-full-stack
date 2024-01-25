"use client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const path = usePathname();
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const [error, setError] = useState("");
 
  const submit = async (data: object) => {
    axios
      .post("/api/issues", data)
      .then((res) =>
        res?.data?.id
          ? router.push(`/issues`)
          : (router.replace(path), Promise.reject("Something went wrong!"))
      )
      .catch((error) => {
        error && setError("Please enter title (max 255 characters) and description (max 2500 characters).");
      });
  };
  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root className="mb-5">
          <Callout.Text color="red">
            <p>{error}</p>
          </Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3"
        onSubmit={handleSubmit((data) => submit(data))}
      >
        <h1 className="text-lg font-extrabold">Create a new issue</h1>
        <TextField.Root>
          <TextField.Input
            placeholder="Title -required and maximum 255 characters!"
            {...register("title")}
          />
          <br />
        </TextField.Root>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE
              placeholder="Enter your description of this issue -required and maximum 2500 characters!"
              {...field}
            />
          )}
        />

        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
