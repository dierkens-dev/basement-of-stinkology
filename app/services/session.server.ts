import { createCookieSessionStorage } from "@remix-run/node";
import { invariant } from "~/utils/invariant";

invariant(
  process.env.BOS_SESSION_STORAGE_SECRET,
  new Error("BOS_SESSION_STORAGE_SECRET should be set")
);

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "bos_session",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: [process.env.BOS_SESSION_STORAGE_SECRET],
    secure: process.env.NODE_ENV === "production",
  },
});

export const { getSession, commitSession, destroySession } = sessionStorage;
