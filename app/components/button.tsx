import { clsx } from "clsx";
import type { ComponentProps } from "react";
import { useRef } from "react";
import type { AriaButtonProps } from "react-aria";
import { useButton } from "react-aria";

export type ButtonProps = AriaButtonProps<"button"> & ComponentProps<"button">;

export function Button({ className, ...props }: ButtonProps) {
  const ref = useRef<HTMLButtonElement | null>(null);
  const { buttonProps } = useButton(props, ref);
  const { children } = props;

  return (
    <button className={clsx("btn", className)} {...buttonProps} ref={ref}>
      {children}
    </button>
  );
}
