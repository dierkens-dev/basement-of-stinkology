import type { ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, useActionData, useTransition } from "@remix-run/react";
import { clsx } from "clsx";
import { sendPasswordResetEmail } from "firebase/auth";
import { Button } from "~/components/button";
import { TextField } from "~/components/text-field";
import { AuthCard } from "~/features/auth";
import { auth } from "~/lib/firebase";
import { invariant } from "~/utils/invariant";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  const email = formData.get("email");

  invariant(typeof email === "string", "Email should be a string.");

  await sendPasswordResetEmail(auth, email);

  return json({
    message: "Please check your email for a reset password link.",
  });
}

export default function PasswordReset() {
  const { submission } = useTransition();
  const data = useActionData<typeof action>();

  if (data) {
    return (
      <AuthCard>
        <div className="card-body">
          <p className="alert alert-info shadow-lg mb-3">{data.message}</p>

          <div className="flex justify-end gap-1">
            <Link className="link hover:link-primary" to="/sign-in">
              Sign In
            </Link>
            or
            <Link className="link hover:link-primary" to="/sign-up">
              Sign Up
            </Link>
          </div>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard>
      <div className="card-body">
        <Form method="post" noValidate>
          <h1 className="card-title mb-3">Reset Password</h1>

          <TextField name="email" type="email" label="Email" />

          <div className="card-actions mb-3 justify-between">
            <Button
              className={clsx("btn-primary", {
                "btn-disabled": Boolean(submission),
                loading: Boolean(submission),
              })}
              disabled={Boolean(submission)}
              type="submit"
            >
              {submission ? "Sending Reset Email..." : "Reset Password"}
            </Button>

            <span className="flex gap-1">
              <Link className="link hover:link-primary" to="/sign-in">
                Sign In
              </Link>
              or
              <Link className="link hover:link-primary" to="/sign-up">
                Sign Up
              </Link>
            </span>
          </div>
        </Form>
      </div>
    </AuthCard>
  );
}
