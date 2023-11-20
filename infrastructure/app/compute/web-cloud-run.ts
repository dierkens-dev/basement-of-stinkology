import { local } from "@pulumi/command";
import * as docker from "@pulumi/docker";
import * as gcp from "@pulumi/gcp";
import * as pulumi from "@pulumi/pulumi";
import { hashElement } from "folder-hash";
import { bosNetwork } from "../network/bos.network";
import { bosAssetBucket } from "../storage/asset-bucket";

if (!gcp.config.project) {
  throw new Error("Please set the project in the config.");
}

const stack = pulumi.getStack();

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

const BOS_MAILJET_API_SECRET = config.getSecret("BOS_MAILJET_API_SECRET");
const BOS_MAILJET_API_KEY = config.getSecret("BOS_MAILJET_API_KEY");

const BOS_POSTGRES_PASSWORD = config.getSecret("BOS_POSTGRES_PASSWORD");
const BOS_POSTGRES_USER = config.getSecret("BOS_POSTGRES_USER");

const shared = new pulumi.StackReference("shared");

const database =
  pulumi.getStack() === "production"
    ? shared.getOutput("bosPostgresDatabaseName")
    : shared.getOutput("bosPostgresDevelopmentDatabaseName");

const bosPostgresInstancePublicIp = shared.getOutput(
  "bosPostgresInstancePublicIp",
);

const bosPostgresInstanceConnectionName = shared.getOutput(
  "bosPostgresInstanceConnectionName",
);

const BOS_DATABASE_URL = pulumi.interpolate`postgresql://${BOS_POSTGRES_USER}:${BOS_POSTGRES_PASSWORD}@${bosPostgresInstancePublicIp}:5432/${database}?host=/cloudsql/${bosPostgresInstanceConnectionName}`;

const BOS_TENANT_ID = config.get("BOS_TENANT_ID");
const BOS_ASSET_BUCKET_NAME = pulumi.interpolate`${bosAssetBucket.name}`;

const imageName = pulumi.interpolate`gcr.io/${gcp.config.project}/bos-web-${stack}`;

const webImage = new docker.Image("bos-web-image", {
  imageName: pulumi.interpolate`${imageName}:${hashElement("../../", {
    algo: "md5",
    encoding: "hex",
    files: {
      include: [
        "yarn.lock",
        "Dockerfile",
        "prisma/schema.prisma",
        "next.config.ts",
        "src/**/*",
      ],
    },
  }).then(({ hash }) => hash)}`,
  build: {
    args: {
      BUILDKIT_INLINE_CACHE: "1",
    },
    builderVersion: "BuilderBuildKit",
    cacheFrom: {
      images: [pulumi.interpolate`${imageName}:latest`],
    },
    context: "../../",
    platform: "linux/amd64",
  },
});

const webImageLatestTag = new docker.Tag(
  "bos-web-image-latest-tag",
  {
    sourceImage: webImage.imageName,
    targetImage: pulumi.interpolate`${imageName}:latest`,
  },
  { dependsOn: [webImage] },
);

const webImagePushCommand = new local.Command(
  "push-web-image-command",
  {
    create: pulumi.interpolate`docker image push --all-tags ${imageName}`,
  },
  { dependsOn: [webImageLatestTag] },
);

export const bos_web_service_account = new gcp.serviceaccount.Account(
  `bos-web-service-account-${stack}`,
  {
    accountId: `web-service-account-${stack}`,
    displayName: "BOS Web Service Account",
  },
);

const serviceAccountUserMember = new gcp.serviceaccount.IAMMember(
  `bos-service-account-user-role-${stack}`,
  {
    serviceAccountId: bos_web_service_account.name,
    role: "roles/iam.serviceAccountUser",
    member: "allUsers",
  },
);

const serviceAccountSqlClientIAMMember = new gcp.projects.IAMMember(
  `bos-cloudsql-client-role-${stack}`,
  {
    project: gcp.config.project,
    role: "roles/cloudsql.client",
    member: pulumi.interpolate`serviceAccount:${bos_web_service_account.email}`,
  },
);

new gcp.storage.BucketIAMMember("bos-asset-bucket-web-service-iam-binding", {
  bucket: bosAssetBucket.name,
  role: "roles/storage.objectUser",
  member: pulumi.interpolate`serviceAccount:${bos_web_service_account.email}`,
});

new gcp.projects.IAMMember(`bos-auth-admin-role-${stack}`, {
  project: gcp.config.project,
  role: "roles/firebaseauth.admin",
  member: pulumi.interpolate`serviceAccount:${bos_web_service_account.email}`,
});

new gcp.projects.IAMMember(`bos-identity-platform-admin-role-${stack}`, {
  project: gcp.config.project,
  role: "roles/identityplatform.admin",
  member: pulumi.interpolate`serviceAccount:${bos_web_service_account.email}`,
});

new gcp.projects.IAMMember(`bos-service-account-token-creator-role-${stack}`, {
  project: gcp.config.project,
  role: "roles/iam.serviceAccountTokenCreator",
  member: pulumi.interpolate`serviceAccount:${bos_web_service_account.email}`,
});

export const webService = new gcp.cloudrunv2.Service(
  "bos-web-service",
  {
    location,
    launchStage: "BETA",
    template: {
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
                stack === "production"
                  ? "basementofstinkology.app"
                  : "dev.basementofstinkology.app",
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
            {
              name: "BOS_MAILJET_API_KEY",
              value: BOS_MAILJET_API_KEY,
            },
            {
              name: "BOS_MAILJET_API_SECRET",
              value: BOS_MAILJET_API_SECRET,
            },
          ],
        },
      ],
      serviceAccount: bos_web_service_account.email,
      vpcAccess: {
        networkInterfaces: [
          {
            network: bosNetwork.name,
          },
        ],
      },
      volumes: [
        {
          name: "cloudsql",
          cloudSqlInstance: {
            instances: [bosPostgresInstanceConnectionName],
          },
        },
      ],
    },
  },
  {
    dependsOn: [
      serviceAccountUserMember,
      serviceAccountSqlClientIAMMember,
      webImagePushCommand,
      webImage,
    ],
  },
);

new gcp.cloudrun.IamMember("bos-web-service-iam-member", {
  service: webService.name,
  location,
  role: "roles/run.invoker",
  member: "allUsers",
});

// const domain =
//   stack === "production"
//     ? "basementofstinkology.app"
//     : `${stack}."basementofstinkology.app"`;

// new gcp.cloudrun.DomainMapping("bos-web-domain-mapping", {
//   location,
//   name: domain,

//   metadata: {
//     namespace: gcp.config.project,
//   },
//   spec: {
//     routeName: webService.name,
//   },
// });
