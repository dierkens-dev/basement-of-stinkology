import * as gcp from "@pulumi/gcp";
import * as docker from "@pulumi/docker";
import * as pulumi from "@pulumi/pulumi";
import { enableCloudRun } from "../apis/enable-cloud-run";
import {
  bosPostgresDatabase,
  bosPostgresInstance,
  bosPostgresUser,
} from "../database/bos-postgresql";

if (!gcp.config.project) {
  throw new Error("Please set the project in the config.");
}

const location = gcp.config.region || "us-central1";

const config = new pulumi.Config();
const BOS_FIREBASE_API_KEY = config.getSecret("BOS_FIREBASE_API_KEY");
const BOS_FIREBASE_AUTH_DOMAIN = config.getSecret("BOS_FIREBASE_AUTH_DOMAIN");
const BOS_SESSION_STORAGE_SECRET = config.getSecret(
  "BOS_SESSION_STORAGE_SECRET"
);

const BOS_POSTGRES_PASSWORD = config.getSecret("BOS_POSTGRES_PASSWORD");
const BOS_POSTGRES_USER = config.getSecret("BOS_POSTGRES_USER");

const BOS_DATABASE_URL = pulumi.interpolate`postgresql://${BOS_POSTGRES_USER}:${BOS_POSTGRES_PASSWORD}@${bosPostgresInstance.publicIpAddress}:5432/${bosPostgresDatabase.name}?host=/cloudsql/${bosPostgresInstance.connectionName}`;

const remixImage = new docker.Image("bos-remix-image", {
  imageName: pulumi.interpolate`gcr.io/${gcp.config.project}/bos-remix`,
  build: {
    context: "../",
    extraOptions: ["--platform", "linux/amd64"],
  },
});

export const bos_remix_service_account = new gcp.serviceaccount.Account(
  "bos-remix-service-account",
  {
    accountId: `remix-service-account`,
    displayName: "BOS Remix Service Account",
  }
);

const serviceAccountUserBinding = new gcp.serviceaccount.IAMBinding(
  "bos-service-account-user-role",
  {
    serviceAccountId: bos_remix_service_account.name,
    role: "roles/iam.serviceAccountUser",
    members: ["allUsers"],
  }
);

const serviceAccountSqlClientIAMBinding = new gcp.projects.IAMBinding(
  `bos-cloudsql-client-role`,
  {
    project: gcp.config.project,
    role: "roles/cloudsql.client",
    members: [
      pulumi.interpolate`serviceAccount:${bos_remix_service_account.email}`,
    ],
  }
);

export const remixService = new gcp.cloudrun.Service(
  "bos-remix-service",
  {
    location,
    template: {
      spec: {
        serviceAccountName: bos_remix_service_account.email,
        containers: [
          {
            image: remixImage.imageName,
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
                name: "BOS_SESSION_STORAGE_SECRET",
                value: BOS_SESSION_STORAGE_SECRET,
              },
              {
                name: "BOS_DATABASE_URL",
                value: BOS_DATABASE_URL,
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
  }
);

new gcp.cloudrun.IamMember("bos-remix-service-iam-member", {
  service: remixService.name,
  location,
  role: "roles/run.invoker",
  member: "allUsers",
});

new gcp.cloudrun.DomainMapping("box-remix-domain-mapping", {
  location,
  name: "basementofstinkology.app",
  metadata: {
    namespace: gcp.config.project,
  },
  spec: {
    routeName: remixService.name,
  },
});
