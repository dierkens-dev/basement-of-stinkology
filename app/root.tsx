import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { SSRProvider } from "react-aria";
import { Footer, Header } from "./features/layout";
import { authenticator } from "./services/auth.server";
import styles from "./styles/app.css";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Basement of Stinkology",
  viewport: "width=device-width,initial-scale=1",
});

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export async function loader({ request }: LoaderArgs) {
  const user = await authenticator.isAuthenticated(request);

  return json({ user });
}

export default function App() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <SSRProvider>
      <html lang="en" className="bg-base-200">
        <head>
          <Meta />
          <Links />
        </head>
        <body>
          <Header user={user}>
            <main className="container mx-auto px-3">
              <Outlet />
            </main>
          </Header>

          <Footer />

          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </SSRProvider>
  );
}
