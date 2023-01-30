import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, Link, useTransition } from "@remix-run/react";
import { clsx } from "clsx";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Button } from "~/components/button";
import { TextField } from "~/components/text-field";
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
    <div className="card w-full max-w-lg m-auto bg-base-100 shadow-xl">
      <div className="card-body">
        <Form method="post" noValidate>
          <h1 className="card-title mb-3">Sign Up</h1>

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
              {submission ? "Signing Up..." : "Sign Up"}
            </Button>

            <span className="flex gap-1">
              <Link className="link hover:link-primary" to="/sign-in">
                Sign In
              </Link>
              or
              <Link className="link hover:link-primary" to="/password-reset">
                Reset Password
              </Link>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
}
