import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { Form, useCatch } from "@remix-run/react";
import type { PropsWithChildren } from "react";

import { authenticator } from "~/services/auth.server";

function Layout({ children }: PropsWithChildren) {
  return <div>{children}</div>;
}

function LoginForm() {
  return (
    <Form method="post" noValidate>
      <input type="email" name="email" required />
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
      <LoginForm />
      {caught.data.message}
    </Layout>
  );
}

export default function Screen() {
  return (
    <Layout>
      <LoginForm />
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
