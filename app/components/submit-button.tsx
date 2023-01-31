import clsx from "clsx";
import type { PropsWithChildren } from "react";
import type { ButtonProps } from "./button";
import { Button } from "./button";

interface SubmitButtonProps extends ButtonProps {
  isLoading?: boolean;
}

export function SubmitButton({
  children,
  disabled,
  isLoading,
}: PropsWithChildren<SubmitButtonProps>) {
  return (
    <Button
      className={clsx("btn-primary", {
        "btn-disabled": disabled,
        loading: isLoading,
      })}
      disabled={disabled}
      type="submit"
    >
      {children}
    </Button>
  );
}
