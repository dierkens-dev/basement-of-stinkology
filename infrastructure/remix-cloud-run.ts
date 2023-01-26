import * as gcp from "@pulumi/gcp";
import * as docker from "@pulumi/docker";
import * as pulumi from "@pulumi/pulumi";
import { enableCloudRun } from "./enable-cloud-run";

const location = gcp.config.region || "us-central1";

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
        containers: [{ image: remixImage.imageName }],
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
