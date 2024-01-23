"use client";
import { Button, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const path = usePathname();
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const submit = async (data: object) => {
    axios
      .post("/api/issues", data)
      .then((res) =>
        res?.data?.id
          ? router.push(`/issues`)
          : (router.replace(path), Promise.reject("Something went wrong!"))
      )
      .catch((error) =>
        // error && alert("Title and/or description missing!")
        {
          console.log("Error: ", error);
          error && alert("Something gone wrong!");
        }
      );
  };
  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit((data) => submit(data))}
    >
      <h3>Create a new issue</h3>
      <TextField.Root>
        <TextField.Input placeholder="Title -required and maximum 255 characters!" {...register("title")} />
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
  );
};

export default NewIssuePage;
