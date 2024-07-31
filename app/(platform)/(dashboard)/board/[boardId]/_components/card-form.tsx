"use client";

import { createCard } from "@/actions/create-card";
import { FormSubmit } from "@/components/form/form-submit";
import { FormTextarea } from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { Plus, X } from "lucide-react";
import { useParams } from "next/navigation";
import { ElementRef, KeyboardEventHandler, forwardRef, useRef } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

interface CardFormProps {
  listId: string;
  isEditing: boolean;
  enableEditing: () => void;
  disableEditing: () => void;
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(({
  listId,
  enableEditing,
  disableEditing,
  isEditing,
}, ref) => {
  const params = useParams();
  const formRef = useRef<ElementRef<"form">>(null);
  const { execute, fieldErrors } = useAction(createCard, {
    onSuccess: (data) => {
      toast.success(`Card "${data.title}" created.`);
      formRef.current?.reset();
    },
    onError: (error) => {
      toast.error(error);
    }
  });

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useOnClickOutside(formRef, disableEditing);
  useEventListener("keydown", onKeyDown);

  const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const listId = formData.get("listId") as string;
    const boardId = params.boardId as string;

    execute({ title, listId, boardId });
  };

  if (isEditing) {
    return (
      <form
        className="m-1 py-0.5 px-1 space-y-4"
        ref={formRef}
        action={onSubmit}
      >
        <FormTextarea
          id="title"
          name="title"
          onKeyDown={onTextareaKeyDown}
          ref={ref}
          placeholder="Enter a title for this card..."
          errors={fieldErrors}
        />
        <input
          hidden
          id="listId"
          name="listId"
          value={listId}
          onChange={(e) => { }}
        />
        <div className="flex items-center gap-x-1">
          <FormSubmit>
            Add Card
          </FormSubmit>
          <Button onClick={disableEditing} size="sm" variant="ghost">
            <X className="w-5 h-5" />
          </Button>
        </div>
      </form>
    );
  }
  return (
    <div className="pt-2 px-2">
      <Button
        onClick={enableEditing}
        className="w-autopx-2 py-1.5 w-full justify-start text-muted-foreground text-sm"
        size="sm"
        variant="ghost"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add a card
      </Button>
    </div>
  );
});

CardForm.displayName = "CardForm";