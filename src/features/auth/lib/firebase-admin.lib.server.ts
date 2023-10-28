import admin from "firebase-admin";
import { applicationDefault } from "firebase-admin/app";
import { invariant } from "~~/app/utils/invariant";

admin.initializeApp({
  projectId: "basement-of-stinkology",
  credential: applicationDefault(),
});

invariant(process.env.BOS_TENANT_ID, "BOS_TENANT_ID should be set");

export const adminAuth = admin
  .auth()
  .tenantManager()
  .authForTenant(process.env.BOS_TENANT_ID);
