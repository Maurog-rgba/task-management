"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { useFormStatus } from "react-dom";
import { FormErrors } from "./form-errors";

interface FormInputProps {
  id?: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  defaultValue?: string;
  onBlur?: () => void;
};

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(({
  id,
  label,
  type = "text",
  placeholder,
  required,
  disabled,
  errors,
  className,
  defaultValue = "",
  onBlur,
}, ref) => {
  const { pending } = useFormStatus();

  return (
    <div className="space-y-2">
      <div className="space-y-1">
        {label ? (
          <Label
            htmlFor={id}
            className="text-xs font-semibold text-neutral-700"
          >
            {label}
          </Label>
        ) : null}
        <Input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          required={required}
          disabled={disabled || pending}
          className={cn(
            "text-sm px-2 py-1 h-7",
            className,
          )}
          defaultValue={defaultValue}
          ref={ref}
          onBlur={onBlur}
          aria-describedby={errors ? `${id}-error` : undefined}
        />
      </div>
      <FormErrors
        id={id as string}
        errors={errors}
      />
    </div>
  )

});

FormInput.displayName = "FormInput";