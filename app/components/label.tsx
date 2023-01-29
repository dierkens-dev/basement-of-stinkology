import { clsx } from "clsx";
import type { ComponentProps, PropsWithChildren } from "react";

export function Label({
  children,
  className,
  ...props
}: PropsWithChildren<ComponentProps<"label">>) {
  return (
    <label className={clsx("label", className)} {...props}>
      <span className="label-text">{children}</span>
    </label>
  );
}
