import * as docker from "@pulumi/docker";
import * as gcp from "@pulumi/gcp";
import * as pulumi from "@pulumi/pulumi";
import crypto from "node:crypto";
import { enableCloudRun } from "../apis/enable-cloud-run";
import {
  bosPostgresDatabase,
  bosPostgresDevelopmentDatabase,
  bosPostgresInstance,
  bosPostgresUser,
} from "../database/bos-postgresql";
import { bosAssetBucket } from "../storage/asset-bucket";

if (!gcp.config.project) {
  throw new Error("Please set the project in the config.");
}

const location = gcp.config.region || "us-central1";

const config = new pulumi.Config();
const BOS_FIREBASE_API_KEY = config.getSecret("BOS_FIREBASE_API_KEY");
const BOS_FIREBASE_AUTH_DOMAIN = config.getSecret("BOS_FIREBASE_AUTH_DOMAIN");
const BOS_SESSION_STORAGE_SECRET = config.getSecret(
  "BOS_SESSION_STORAGE_SECRET",
);
const BOS_THE_MOVIE_DB_API_TOKEN = config.getSecret(
  "BOS_THE_MOVIE_DB_API_TOKEN",
);

const BOS_POSTGRES_PASSWORD = config.getSecret("BOS_POSTGRES_PASSWORD");
const BOS_POSTGRES_USER = config.getSecret("BOS_POSTGRES_USER");

const stack = pulumi.getStack();
const database =
  stack === "production"
    ? bosPostgresDatabase.name
    : bosPostgresDevelopmentDatabase.name;

const BOS_DATABASE_URL = pulumi.interpolate`postgresql://${BOS_POSTGRES_USER}:${BOS_POSTGRES_PASSWORD}@${bosPostgresInstance.publicIpAddress}:5432/${database}?host=/cloudsql/${bosPostgresInstance.connectionName}`;

const BOS_TENANT_ID = config.get("BOS_TENANT_ID");
const BOS_ASSET_BUCKET_NAME = pulumi.interpolate`${bosAssetBucket.name}`;

const webImage = new docker.Image("bos-web-image", {
  imageName: pulumi.interpolate`gcr.io/${gcp.config.project}/bos-web:${crypto
    .randomBytes(8)
    .toString("hex")}`,
  build: {
    context: "../",
    platform: "linux/amd64",
  },
});

export const bos_web_service_account = new gcp.serviceaccount.Account(
  "bos-web-service-account",
  {
    accountId: `web-service-account`,
    displayName: "BOS Web Service Account",
  },
);

const serviceAccountUserBinding = new gcp.serviceaccount.IAMBinding(
  "bos-service-account-user-role",
  {
    serviceAccountId: bos_web_service_account.name,
    role: "roles/iam.serviceAccountUser",
    members: ["allUsers"],
  },
);

const serviceAccountSqlClientIAMBinding = new gcp.projects.IAMBinding(
  `bos-cloudsql-client-role`,
  {
    project: gcp.config.project,
    role: "roles/cloudsql.client",
    members: [
      pulumi.interpolate`serviceAccount:${bos_web_service_account.email}`,
    ],
  },
);

new gcp.storage.BucketIAMBinding("bos-asset-bucket-web-service-iam-binding", {
  bucket: bosAssetBucket.name,
  role: "roles/storage.objectUser",
  members: [
    pulumi.interpolate`serviceAccount:${bos_web_service_account.email}`,
  ],
});

new gcp.projects.IAMBinding(`bos-auth-admin-role`, {
  project: gcp.config.project,
  role: "roles/firebaseauth.admin",
  members: [
    pulumi.interpolate`serviceAccount:${bos_web_service_account.email}`,
  ],
});

new gcp.projects.IAMBinding(`bos-identity-platform-admin-role`, {
  project: gcp.config.project,
  role: "roles/identityplatform.admin",
  members: [
    pulumi.interpolate`serviceAccount:${bos_web_service_account.email}`,
  ],
});

new gcp.projects.IAMBinding(`bos-service-account-token-creator-role`, {
  project: gcp.config.project,
  role: "roles/iam.serviceAccountTokenCreator",
  members: [
    pulumi.interpolate`serviceAccount:${bos_web_service_account.email}`,
  ],
});

export const webService = new gcp.cloudrun.Service(
  "bos-web-service",
  {
    location,
    // https://github.com/hashicorp/terraform-provider-google/issues/5898
    autogenerateRevisionName: true,
    template: {
      spec: {
        serviceAccountName: bos_web_service_account.email,
        containers: [
          {
            image: webImage.imageName,
            envs: [
              {
                name: "BOS_FIREBASE_API_KEY",
                value: BOS_FIREBASE_API_KEY,
              },
              {
                name: "BOS_FIREBASE_AUTH_DOMAIN",
                value: BOS_FIREBASE_AUTH_DOMAIN,
              },
              {
                name: "AUTH_ORIGIN",
                value:
                  "https://bos-web-service-a446c21-eydvcqdlla-uc.a.run.app/",
              },
              {
                name: "BOS_SESSION_STORAGE_SECRET",
                value: BOS_SESSION_STORAGE_SECRET,
              },
              {
                name: "BOS_DATABASE_URL",
                value: BOS_DATABASE_URL,
              },
              {
                name: "BOS_THE_MOVIE_DB_API_TOKEN",
                value: BOS_THE_MOVIE_DB_API_TOKEN,
              },
              {
                name: "BOS_TENANT_ID",
                value: BOS_TENANT_ID,
              },
              {
                name: "BOS_ASSET_BUCKET_NAME",
                value: BOS_ASSET_BUCKET_NAME,
              },
            ],
          },
        ],
      },
      metadata: {
        annotations: {
          "run.googleapis.com/cloudsql-instances":
            bosPostgresInstance.connectionName,
        },
      },
    },
  },
  {
    dependsOn: [
      enableCloudRun,
      serviceAccountUserBinding,
      bosPostgresDatabase,
      bosPostgresUser,
      serviceAccountSqlClientIAMBinding,
    ],
  },
);

new gcp.cloudrun.IamMember("bos-web-service-iam-member", {
  service: webService.name,
  location,
  role: "roles/run.invoker",
  member: "allUsers",
});

// new gcp.cloudrun.DomainMapping("box-web-domain-mapping", {
//   location,
//   name: "basementofstinkology.app",
//   metadata: {
//     namespace: gcp.config.project,
//   },
//   spec: {
//     routeName: webService.name,
//   },
// });
