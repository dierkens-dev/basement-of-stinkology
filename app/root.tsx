import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import type { V2_ServerRuntimeMetaFunction } from "@remix-run/server-runtime";
import clsx from "clsx";
import { Header } from "./features/layout";
import { authenticator } from "./services/auth.server";
import styles from "./styles/app.css";

export const meta: V2_ServerRuntimeMetaFunction = () => {
  return [
    {
      title: "Basement of Stinkology",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
    {
      name: "charset",
      content: "utf-8",
    },
  ];
};

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export async function loader({ request }: LoaderArgs) {
  const user = await authenticator.isAuthenticated(request);

  return json({ user });
}

export default function App() {
  const { user } = useLoaderData<typeof loader>();
  const navigation = useNavigation();

  return (
    <html lang="en" className="bg-base-200">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Header user={user}>
          <progress
            className={clsx("progress progress-primary block flex-shrink-0", {
              invisible: navigation.state === "idle",
            })}
          ></progress>

          <main className="container mx-auto px-3 mt-3 flex-auto">
            <Outlet />
          </main>
        </Header>

        {/* <Footer /> */}

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
