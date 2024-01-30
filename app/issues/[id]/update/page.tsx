"use client";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useRouter, usePathname } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchemas";
import { z } from "zod";
import { toLowercase } from "@/app/utils";
import ErrorMessage from "@/components/ErrorMessage";
import Spinner from "@/components/Spinner";

type IssueForm = z.infer<typeof createIssueSchema>;

const UpdateIssuePage = () => {
  const router = useRouter();
  const params = useParams();
  const path = usePathname();
  const [issue, setIssue] = useState({
    title: "",
    description: "",
    status: "",
  });

  const { id } = params;
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

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = async (data: object) => {
    axios
      .put(`/api/issues/${id}`, data)
      .then((res) => {
        setSubmitting(true);
        res?.data?.id
          ? router.push(`/issues/${id}`)
          : (router.replace(path), Promise.reject("Something went wrong!"));
      })
      .catch((error) => {
        setSubmitting(false);
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
        <h1 className="text-lg font-extrabold">Update issue with no of {id}</h1>
        <TextField.Root>
          <TextField.Input
            placeholder="Title -required and maximum 255 characters!"
            defaultValue={issue?.title}
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
              value={issue?.description}
            />
          )}
        />
        <ErrorMessage>
          {errors?.description?.message === "Required"
            ? `Description is ${toLowercase(errors?.description?.message)}`
            : errors?.description?.message}
        </ErrorMessage>
        <Button disabled={submitting}>
          Submit Edited Issue with no {id}
          {submitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default UpdateIssuePage;
