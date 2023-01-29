import type { ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { sendPasswordResetEmail } from "firebase/auth";
import { Button } from "~/components/button";
import { TextField } from "~/components/text-field";
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
  return (
    <div className="card w-full max-w-lg m-auto bg-base-100 shadow-xl">
      <div className="card-body">
        <Form method="post" noValidate>
          <h1 className="card-title mb-3">Reset Password</h1>

          <TextField name="email" type="email" label="Email" />

          <div className="card-actions mb-3">
            <Button className="btn-primary" type="submit">
              Reset Password
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
