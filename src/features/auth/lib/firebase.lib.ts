import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { invariant } from "~/utils/invariant";

invariant(
  process.env.BOS_FIREBASE_API_KEY,
  "BOS_FIREBASE_API_KEY should be set",
);

invariant(
  process.env.BOS_FIREBASE_AUTH_DOMAIN,
  "BOS_FIREBASE_AUTH_DOMAIN should be set",
);

const app = initializeApp({
  apiKey: process.env.BOS_FIREBASE_API_KEY,
  authDomain: process.env.BOS_FIREBASE_AUTH_DOMAIN,
});

const auth = getAuth(app);

invariant(process.env.BOS_TENANT_ID, "BOS_TENANT_ID should be set");

auth.tenantId = process.env.BOS_TENANT_ID;

export { auth };
