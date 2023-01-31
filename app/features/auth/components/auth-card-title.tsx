import type { PropsWithChildren } from "react";

export function AuthCardTitle({ children }: PropsWithChildren) {
  return <h1 className="card-title mb-3">{children}</h1>;
}
