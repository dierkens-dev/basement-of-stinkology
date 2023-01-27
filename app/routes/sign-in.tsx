import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { Form, Link, useCatch } from "@remix-run/react";
import type { PropsWithChildren } from "react";

import { authenticator } from "~/services/auth.server";

function Layout({ children }: PropsWithChildren) {
  return (
    <div>
      <h1>Sign In</h1>

      {children}

      <p>
        <Link to="/sign-up">Sign Up</Link>
      </p>
      <p>
        <Link to="/password-reset">Reset Password</Link>
      </p>
    </div>
  );
}

function SignInForm() {
  return (
    <Form method="post" noValidate>
      <label htmlFor="email">Email</label>
      <input type="email" name="email" required />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        autoComplete="current-password"
        required
      />
      <button>Log In</button>
    </Form>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <Layout>
      <SignInForm />
      {caught.data.message}
    </Layout>
  );
}

export default function Screen() {
  return (
    <Layout>
      <SignInForm />
    </Layout>
  );
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
