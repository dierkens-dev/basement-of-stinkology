import * as gcp from "@pulumi/gcp";
import * as docker from "@pulumi/docker";
import * as pulumi from "@pulumi/pulumi";
import { enableCloudRun } from "../apis/enable-cloud-run";

const location = gcp.config.region || "us-central1";

const config = new pulumi.Config();
const BOS_FIREBASE_API_KEY = config.getSecret("BOS_FIREBASE_API_KEY");
const BOS_FIREBASE_AUTH_DOMAIN = config.getSecret("BOS_FIREBASE_AUTH_DOMAIN");
const BOS_SESSION_STORAGE_SECRET = config.getSecret(
  "BOS_SESSION_STORAGE_SECRET"
);

const remixImage = new docker.Image("bos-remix-image", {
  imageName: pulumi.interpolate`gcr.io/${gcp.config.project}/bos-remix`,
  build: {
    context: "../",
    extraOptions: ["--platform", "linux/amd64"],
  },
});

export const remixService = new gcp.cloudrun.Service(
  "bos-remix-service",
  {
    location,
    template: {
      spec: {
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
            ],
          },
        ],
      },
    },
  },
  { dependsOn: enableCloudRun }
);

new gcp.cloudrun.IamMember("bos-remix-service-iam-member", {
  service: remixService.name,
  location,
  role: "roles/run.invoker",
  member: "allUsers",
});
