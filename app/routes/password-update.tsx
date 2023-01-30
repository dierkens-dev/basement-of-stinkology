import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData, useTransition } from "@remix-run/react";
import { clsx } from "clsx";
import { confirmPasswordReset } from "firebase/auth";
import { Button } from "~/components/button";
import { TextField } from "~/components/text-field";
import { auth } from "~/lib/firebase";
import { invariant } from "~/utils/invariant";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const code = formData.get("code");
  const password = formData.get("password");

  invariant(typeof code === "string", "Code should be a string");
  invariant(typeof password === "string", "Password should be a string");

  await confirmPasswordReset(auth, code, password);

  return redirect("/sign-in");
}

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  const code = url.searchParams.get("oobCode");

  invariant(typeof code === "string", "Reset code missing.");

  return json({ code });
}

export default function PasswordUpdate() {
  const { code } = useLoaderData<typeof loader>();
  const { submission } = useTransition();

  return (
    <div className="card w-full max-w-lg m-auto bg-base-100 shadow-xl">
      <div className="card-body">
        <Form method="post" noValidate>
          <h1 className="card-title mb-3">Update Password</h1>

          <TextField name="password" type="password" label="New Password" />

          <input type="hidden" name="code" value={code} />

          <div className="card-actions mb-3 justify-between">
            <Button
              className={clsx("btn-primary", {
                "btn-disabled": Boolean(submission),
                loading: Boolean(submission),
              })}
              disabled={Boolean(submission)}
              type="submit"
            >
              {submission ? "Updating Password..." : "Update Password"}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
