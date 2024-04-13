"use client";

import { createBoard } from "@/actions/create-board/index";
import { useAction } from "@/hooks/use-action";
import { FormButton } from "./form-button";
import { FormInput } from "./form-input";

export const Form = () => {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log("Board created", data);
    },
    onError: (error) => {
      console.error("Failed to create board", error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;

    execute({ title });
  };

  return (
    <form action={onSubmit}>
      <div className="flex flex-col space-y-2">
        <FormInput errors={fieldErrors} />
      </div>
      <FormButton />
    </form>
  );
};