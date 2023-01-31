import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, Link, useTransition } from "@remix-run/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
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
  const password = formData.get("password");

  invariant(typeof email === "string", "Email should be a string");
  invariant(typeof password === "string", "Password should be a string");

  await createUserWithEmailAndPassword(auth, email, password);

  return redirect("/sign-in");
}

export default function SignUp() {
  const { submission } = useTransition();

  return (
    <AuthCard>
      <AuthCardBody>
        <Form method="post" noValidate>
          <AuthCardTitle>Sign Up</AuthCardTitle>

          <TextField name="email" type="email" label="Email" />
          <TextField name="password" type="password" label="Password" />

          <AuthCardActions>
            <SubmitButton
              isLoading={Boolean(submission)}
              disabled={Boolean(submission)}
            >
              {submission ? "Signing Up..." : "Sign Up"}
            </SubmitButton>

            <AuthCardLinks>
              <Link className="link hover:link-primary" to="/sign-in">
                Sign In
              </Link>
              or
              <Link className="link hover:link-primary" to="/password-reset">
                Reset Password
              </Link>
            </AuthCardLinks>
          </AuthCardActions>
        </Form>
      </AuthCardBody>
    </AuthCard>
  );
}
