import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/server-runtime";
import { authenticator } from "~/services/auth.server";

export async function loader({ request }: LoaderArgs) {
  const user = await authenticator.isAuthenticated(request);

  return json({ user });
}

export default function Index() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>

      {user ? user.email : null}
    </div>
  );
}
