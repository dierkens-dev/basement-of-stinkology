import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Link, useLocation, useNavigation } from "@remix-run/react";
import { withZod } from "@remix-validated-form/with-zod";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ValidatedForm, validationError } from "remix-validated-form";
import { z } from "zod";
import { SubmitButton } from "~/components/submit-button";
import { TextField } from "~/components/text-field";
import {
  AuthCard,
  AuthCardActions,
  AuthCardBody,
  AuthCardLinks,
  AuthCardTitle,
  getRedirectURL,
} from "~/features/auth";
import { auth } from "~/lib/firebase";

const validator = withZod(
  z.object({
    email: z
      .string()
      .min(1, { message: "Email is required." })
      .email("Must be a valid email."),
    password: z.string().min(1, "Password is required."),
  })
);

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  const result = await validator.validate(formData);

  if (result.error) {
    return validationError(result.error);
  }

  const { email, password } = result.data;

  await createUserWithEmailAndPassword(auth, email, password);

  return redirect(getRedirectURL({ request }));
}

export default function SignUp() {
  const navigation = useNavigation();
  const location = useLocation();

  return (
    <AuthCard>
      <AuthCardBody>
        <ValidatedForm validator={validator} method="post">
          <AuthCardTitle>Sign Up</AuthCardTitle>

          <TextField name="email" type="email" label="Email" />
          <TextField name="password" type="password" label="Password" />

          <AuthCardActions>
            <SubmitButton
              isLoading={navigation.state !== "idle"}
              disabled={navigation.state !== "idle"}
            >
              {navigation.state === "submitting" ? "Signing Up..." : "Sign Up"}
            </SubmitButton>

            <AuthCardLinks>
              <Link
                className="link hover:link-primary"
                to={getRedirectURL({ location })}
              >
                Sign In
              </Link>
              or
              <Link className="link hover:link-primary" to="/password-reset">
                Reset Password
              </Link>
            </AuthCardLinks>
          </AuthCardActions>
        </ValidatedForm>
      </AuthCardBody>
    </AuthCard>
  );
}
