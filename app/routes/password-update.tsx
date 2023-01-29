import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { confirmPasswordReset } from "firebase/auth";
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

export default function PasswordConfirm() {
  const { code } = useLoaderData<typeof loader>();
  return (
    <div>
      <Form method="post" noValidate>
        <label htmlFor="password">New Password</label>
        <input type="password" name="password" />

        <input type="hidden" name="code" value={code} />

        <button>Update Password</button>
      </Form>
    </div>
  );
}
