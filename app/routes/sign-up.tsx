import { Form, Link } from "@remix-run/react";
import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { createUserWithEmailAndPassword } from "firebase/auth";
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
  return (
    <div>
      <h1>Sign Up</h1>
      <Form noValidate method="post">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" />

        <label htmlFor="password">Password</label>
        <input type="password" name="password" />

        <button type="submit">Sign Up</button>
      </Form>

      <p>
        <Link to="/sign-in">Sign In</Link>
      </p>
      <p>
        <Link to="/password-reset">Reset Password</Link>
      </p>
    </div>
  );
}
