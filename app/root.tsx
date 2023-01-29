import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { SSRProvider } from "react-aria";
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
      <html lang="en">
        <head>
          <Meta />
          <Links />
        </head>
        <body className="bg-slate-100">
          <header className="mb-6 bg-white border-b-slate-300 shadow-md">
            <nav className="navbar">
              <div className="flex-1">
                <a href="/" className="link">
                  Basement of Stinkology
                </a>
              </div>
              <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                  <li>
                    {user ? user.email : <Link to="/sign-in">Sign In</Link>}
                  </li>
                </ul>
              </div>
            </nav>
          </header>
          <main className="container mx-auto">
            <Outlet />
          </main>
          <footer className="footer footer-center p-4 bg-base-300 text-base-content">
            <div>
              <p>Copyright © 2023 - All right reserved Dierkens Development</p>
            </div>
          </footer>

          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </SSRProvider>
  );
}
