import React from "react";
import type { AriaTextFieldOptions } from "react-aria";
import { useTextField } from "react-aria";
import { useField } from "remix-validated-form";
import { FormControl } from "./form-control";
import { Input } from "./input";
import { Label } from "./label";

type TextFieldProps = Omit<AriaTextFieldOptions<"input">, "name" | "label"> &
  Required<Pick<AriaTextFieldOptions<"input">, "name" | "label">>;

export function TextField(props: TextFieldProps) {
  const { label, name } = props;

  const ref = React.useRef<HTMLInputElement | null>(null);

  const { error, getInputProps } = useField(name);
  const { labelProps, inputProps, descriptionProps, errorMessageProps } =
    useTextField(
      {
        ...props,
        errorMessage: error,
        validationState: error ? "invalid" : "valid",
      },
      ref
    );

  return (
    <FormControl>
      <Label {...labelProps} suppressHydrationWarning>
        {label}
      </Label>

      <Input
        {...inputProps}
        {...getInputProps()}
        suppressHydrationWarning
        ref={ref}
      />

      {props.description && (
        <div {...descriptionProps} className="text-sm">
          {props.description}
        </div>
      )}

      {error && (
        <div {...errorMessageProps} className="text-sm text-error py-2">
          {error}
        </div>
      )}
    </FormControl>
  );
}
