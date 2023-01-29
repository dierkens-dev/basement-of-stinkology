import React from "react";
import type { AriaTextFieldOptions } from "react-aria";
import { useTextField } from "react-aria";
import { FormControl } from "./form-control";
import { Input } from "./input";
import { Label } from "./label";

export function TextField(props: AriaTextFieldOptions<"input">) {
  const { label } = props;

  const ref = React.useRef<HTMLInputElement | null>(null);

  const { labelProps, inputProps, descriptionProps, errorMessageProps } =
    useTextField(props, ref);

  return (
    <FormControl>
      <Label {...labelProps}>{label}</Label>
      <Input {...inputProps} ref={ref} />

      {props.description && (
        <div {...descriptionProps} className="text-sm">
          {props.description}
        </div>
      )}
      {props.errorMessage && (
        <div {...errorMessageProps} className="text-sm text-error">
          {props.errorMessage}
        </div>
      )}
    </FormControl>
  );
}
