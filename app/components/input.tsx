import { clsx } from "clsx";
import type { ComponentProps } from "react";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return (
    <input className={clsx("input input-bordered", className)} {...props} />
  );
}
