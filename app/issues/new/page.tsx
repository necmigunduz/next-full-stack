"use client";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchemas";
import { z } from "zod";
import { toLowercase } from "@/app/utils";
import ErrorMessage from "@/app/components/ErrorMessage";
type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const router = useRouter();
  const path = usePathname();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
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
        error &&
          setError(
            "Please enter title (max 255 characters) and description (max 2500 characters)."
          );
      });
  };
  function toLowerCase(message: string | undefined): React.ReactNode {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="max-w-xl">
      {/* {error && (
        <Callout.Root className="mb-5">
          <Callout.Text color="red">
            <p>{error}</p>
          </Callout.Text>
        </Callout.Root>
      )} */}

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
        <ErrorMessage>{errors?.title?.message}</ErrorMessage>
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
        <ErrorMessage>
          {errors?.description?.message === "Required"
            ? `Description is ${toLowercase(errors?.description?.message)}`
            : errors?.description?.message}
        </ErrorMessage>
        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
