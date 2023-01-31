import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { Form, Link, useCatch, useTransition } from "@remix-run/react";
import { SubmitButton } from "~/components/submit-button";
import { TextField } from "~/components/text-field";
import {
  AuthCard,
  AuthCardActions,
  AuthCardBody,
  AuthCardLinks,
  AuthCardTitle,
} from "~/features/auth";
import { authenticator } from "~/services/auth.server";

function Layout({ message }: { message?: string }) {
  const { submission } = useTransition();

  return (
    <AuthCard>
      <AuthCardBody>
        <Form method="post" noValidate>
          <AuthCardTitle>Sign In</AuthCardTitle>

          <TextField name="email" type="email" label="Email" />
          <TextField name="password" type="password" label="Password" />

          <AuthCardActions>
            <SubmitButton
              isLoading={Boolean(submission)}
              disabled={Boolean(submission)}
            >
              {submission ? "Signing In..." : "Sign In"}
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

          {message ? (
            <p className="alert alert-warning shadow-lg mb-3">{message}</p>
          ) : null}
        </Form>
      </AuthCardBody>
    </AuthCard>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return <Layout message={caught.data.message} />;
}

export default function Screen() {
  return <Layout />;
}

export async function action({ request }: ActionArgs) {
  return await authenticator.authenticate("user-pass", request, {
    successRedirect: "/",
  });
}

export async function loader({ request }: LoaderArgs) {
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/",
  });
}
