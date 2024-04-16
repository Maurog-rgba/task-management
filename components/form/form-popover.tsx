"use client";

import { createBoard } from "@/actions/create-board";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useAction } from "@/hooks/use-action";

import { X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { FormInput } from "./form-input";
import { FormSubmit } from "./form-submit";

interface FormPopoverProps {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

export const FormPopover = ({
  children,
  side = "bottom",
  align = "start",
  sideOffset = 0,
}: FormPopoverProps) => {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: () => {
      console.log("Board created");
      toast.success("Board created");
    },
    onError: (error) => {
      console.log("Error creating board", error);
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    execute({ title });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent align={align} className="w-80 pt-3" side={side} sideOffset={sideOffset}>
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Create new board
        </div>
        <PopoverClose asChild>
          <Button className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600">
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <form className="space-y-2" action={onSubmit}>
          <div className="space-y-4">
            <FormInput id="title" label="Board Title" type="text" errors={fieldErrors} />
          </div>
          <FormSubmit className="w-full">
            Create Board
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};