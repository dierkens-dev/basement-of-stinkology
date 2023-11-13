import * as gcp from "@pulumi/gcp";

export const enableCloudRun = new gcp.projects.Service(
  "EnableCloudRun",
  {
    service: "run.googleapis.com",
    disableDependentServices: false,
    disableOnDestroy: false,
  },
  {
    retainOnDelete: true,
  },
);
