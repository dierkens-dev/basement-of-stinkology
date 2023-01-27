import type { ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "~/lib/firebase";
import { invariant } from "~/utils/invariant";

export async function action({ request }: ActionArgs) {
  let formData = await request.formData();

  let email = formData.get("email");

  invariant(typeof email === "string", "Email should be a string.");

  await sendPasswordResetEmail(auth, email);

  return json({
    message: "Please check your email for a reset password link.",
  });
}

export default function Login() {
  const data = useActionData<typeof action>();
  return (
    <div>
      <div>
        <h1>Password Reset</h1>
      </div>
      <Form method="post">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" required />

        <button type="submit">Reset Password</button>
      </Form>

      {data ? data.message : null}
    </div>
  );
}
