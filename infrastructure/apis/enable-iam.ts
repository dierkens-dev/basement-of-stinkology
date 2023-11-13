import * as gcp from "@pulumi/gcp";

export const enableIam = new gcp.projects.Service(
  "EnableIam",
  {
    service: "iam.googleapis.com",
    disableDependentServices: false,
    disableOnDestroy: false,
  },
  {
    retainOnDelete: true,
  },
);
