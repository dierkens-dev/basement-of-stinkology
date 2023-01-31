import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { Form, Link, useCatch, useTransition } from "@remix-run/react";
import { clsx } from "clsx";
import { Button } from "~/components/button";
import { TextField } from "~/components/text-field";
import { AuthCard } from "~/features/auth";
import { authenticator } from "~/services/auth.server";

function Layout({ message }: { message?: string }) {
  const { submission } = useTransition();

  return (
    <AuthCard>
      <div className="card-body">
        <Form method="post" noValidate>
          <h1 className="card-title mb-3">Sign In</h1>

          <TextField name="email" type="email" label="Email" />
          <TextField name="password" type="password" label="Password" />

          <div className="card-actions mb-3 justify-between">
            <Button
              className={clsx("btn-primary", {
                "btn-disabled": Boolean(submission),
                loading: Boolean(submission),
              })}
              disabled={Boolean(submission)}
              type="submit"
            >
              {submission ? "Signing In..." : "Sign In"}
            </Button>

            <span className="flex gap-1">
              <Link className="link hover:link-primary" to="/sign-up">
                Sign Up
              </Link>
              or
              <Link className="link hover:link-primary" to="/password-reset">
                Reset Password
              </Link>
            </span>
          </div>

          {message ? (
            <p className="alert alert-warning shadow-lg mb-3">{message}</p>
          ) : null}
        </Form>
      </div>
    </AuthCard>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return <Layout message={caught.data.message} />;
}

export default function Screen() {
  return <Layout />;
}

export async function action({ request }: ActionArgs) {
  return await authenticator.authenticate("user-pass", request, {
    successRedirect: "/",
  });
}

export async function loader({ request }: LoaderArgs) {
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/",
  });
}
