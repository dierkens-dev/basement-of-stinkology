import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
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
  return (
    <div className="card w-full max-w-lg m-auto bg-base-100 shadow-xl">
      <div className="card-body">
        <Form method="post" noValidate>
          <h1 className="card-title mb-3">Sign Up</h1>

          <TextField name="email" type="email" label="Email" />
          <TextField name="password" type="password" label="Password" />

          <div className="card-actions mb-3">
            <Button className="btn-primary" type="submit">
              Log In
            </Button>

            <span className="flex gap-1">
              <Link className="link hover:link-primary" to="/sign-In">
                Sign In
              </Link>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
}
