import type { ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, useActionData, useTransition } from "@remix-run/react";
import { sendPasswordResetEmail } from "firebase/auth";
import { SubmitButton } from "~/components/submit-button";
import { TextField } from "~/components/text-field";
import {
  AuthCard,
  AuthCardActions,
  AuthCardBody,
  AuthCardLinks,
  AuthCardTitle,
} from "~/features/auth";
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
        <AuthCardBody>
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
        </AuthCardBody>
      </AuthCard>
    );
  }

  return (
    <AuthCard>
      <AuthCardBody>
        <Form method="post" noValidate>
          <AuthCardTitle>Reset Password</AuthCardTitle>

          <TextField name="email" type="email" label="Email" />

          <AuthCardActions>
            <SubmitButton
              isLoading={Boolean(submission)}
              disabled={Boolean(submission)}
            >
              {submission ? "Sending Reset Email..." : "Reset Password"}
            </SubmitButton>

            <AuthCardLinks>
              <Link className="link hover:link-primary" to="/sign-in">
                Sign In
              </Link>
              or
              <Link className="link hover:link-primary" to="/sign-up">
                Sign Up
              </Link>
            </AuthCardLinks>
          </AuthCardActions>
        </Form>
      </AuthCardBody>
    </AuthCard>
  );
}
