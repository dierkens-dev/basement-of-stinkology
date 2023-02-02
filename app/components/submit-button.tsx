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
  className,
  isLoading,
}: PropsWithChildren<SubmitButtonProps>) {
  return (
    <Button
      className={clsx(
        "btn-primary",
        {
          "btn-disabled": disabled,
          loading: isLoading,
        },
        className
      )}
      disabled={disabled}
      type="submit"
    >
      {children}
    </Button>
  );
}
