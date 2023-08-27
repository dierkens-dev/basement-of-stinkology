import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { invariant } from "~/utils/invariant";

invariant(
  process.env.BOS_FIREBASE_API_KEY,
  "BOS_SESSION_STORAGE_SECRET should be set",
);

invariant(
  process.env.BOS_FIREBASE_AUTH_DOMAIN,
  "BOS_SESSION_STORAGE_SECRET should be set",
);

const app = initializeApp({
  apiKey: process.env.BOS_FIREBASE_API_KEY,
  authDomain: process.env.BOS_FIREBASE_AUTH_DOMAIN,
});

const auth = getAuth(app);

export { auth };
