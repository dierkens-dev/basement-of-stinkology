import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData, useTransition } from "@remix-run/react";
import { confirmPasswordReset } from "firebase/auth";
import { SubmitButton } from "~/components/submit-button";
import { TextField } from "~/components/text-field";
import {
  AuthCard,
  AuthCardActions,
  AuthCardBody,
  AuthCardTitle,
} from "~/features/auth";
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
    <AuthCard>
      <AuthCardBody>
        <Form method="post" noValidate>
          <AuthCardTitle>Update Password</AuthCardTitle>

          <TextField name="password" type="password" label="New Password" />

          <input type="hidden" name="code" value={code} />

          <AuthCardActions>
            <SubmitButton
              isLoading={Boolean(submission)}
              disabled={Boolean(submission)}
            >
              {submission ? "Updating Password..." : "Update Password"}
            </SubmitButton>
          </AuthCardActions>
        </Form>
      </AuthCardBody>
    </AuthCard>
  );
}
