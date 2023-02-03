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
      <html lang="en" className="bg-base-200">
        <head>
          <Meta />
          <Links />
        </head>
        <body>
          <header className="mb-6 bg-base-100 border-b-base-200 shadow-md">
            <nav className="navbar nav">
              <div className="flex-1">
                <a href="/" className="btn btn-link">
                  Basement of Stinkology
                </a>
              </div>
              <div className="flex-none">
                <ul className="menu menu-horizontal">
                  {user && (
                    <>
                      <li>
                        <Link to="/profile">{user.email}</Link>
                      </li>
                      <li>
                        <Link to="/sign-out">Sign Out</Link>
                      </li>
                    </>
                  )}
                  {!user && (
                    <li>
                      <Link to="/sign-in">Sign In</Link>
                    </li>
                  )}
                </ul>
              </div>
            </nav>
          </header>
          <main className="container mx-auto px-3">
            <Outlet />
          </main>
          <footer className="footer footer-center p-4 bg-base-100 text-base-content">
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
