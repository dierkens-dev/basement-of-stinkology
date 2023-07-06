import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import {
  Link,
  isRouteErrorResponse,
  useNavigation,
  useRouteError,
} from "@remix-run/react";
import { withZod } from "@remix-validated-form/with-zod";
import { ValidatedForm, validationError } from "remix-validated-form";
import { z } from "zod";
import { SubmitButton } from "~/components/submit-button";
import { TextField } from "~/components/text-field";
import { P } from "~/components/typeography/p";
import {
  AuthCard,
  AuthCardActions,
  AuthCardBody,
  AuthCardLinks,
  AuthCardTitle,
} from "~/features/auth";
import { authenticator } from "~/services/auth.server";

const validator = withZod(
  z.object({
    email: z
      .string()
      .min(1, { message: "Email is required." })
      .email("Must be a valid email."),
    password: z.string().min(1, "Password is required."),
  })
);

export async function action({ request, params }: ActionArgs) {
  const clone = request.clone();
  const formData = await clone.formData();

  const result = await validator.validate(formData);

  if (result.error) {
    return validationError(result.error);
  }

  const url = new URL(request.url);
  const redirectTo = url.searchParams.get("redirectTo");

  return await authenticator.authenticate("user-pass", request, {
    successRedirect: redirectTo || "/",
  });
}

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  const redirectTo = url.searchParams.get("redirectTo");

  return await authenticator.isAuthenticated(request, {
    successRedirect: redirectTo || "/",
  });
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return <SignIn message={error.data.message} />;
  }

  return null;
}

export default function SignIn({ message }: { message?: string }) {
  const navigation = useNavigation();

  return (
    <AuthCard>
      <AuthCardBody>
        <ValidatedForm validator={validator} method="post">
          <AuthCardTitle>Sign In</AuthCardTitle>

          <TextField name="email" type="email" label="Email" />
          <TextField name="password" type="password" label="Password" />

          {message ? (
            <P className="alert alert-error shadow-lg mb-3">{message}</P>
          ) : null}

          <AuthCardActions>
            <SubmitButton
              isLoading={navigation.state !== "idle"}
              disabled={navigation.state !== "idle"}
            >
              {navigation.state === "submitting" ? "Signing In..." : "Sign In"}
            </SubmitButton>

            <AuthCardLinks>
              <Link className="link hover:link-primary" to="/sign-up">
                Sign Up
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
