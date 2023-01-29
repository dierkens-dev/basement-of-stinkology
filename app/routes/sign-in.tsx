import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { Form, Link, useCatch } from "@remix-run/react";
import { Button } from "~/components/button";
import { TextField } from "~/components/text-field";

import { authenticator } from "~/services/auth.server";

function Layout({ message }: { message?: string }) {
  return (
    <div className="card w-full max-w-lg m-auto bg-base-100 shadow-xl">
      <div className="card-body">
        <Form method="post" noValidate>
          <h1 className="card-title mb-3">Sign In</h1>

          <TextField name="email" type="email" label="Email" />
          <TextField name="password" type="password" label="Password" />

          <div className="card-actions mb-3">
            <Button className="btn-primary" type="submit">
              Log In
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
    </div>
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
