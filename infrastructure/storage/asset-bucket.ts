import * as gcp from "@pulumi/gcp";
import * as pulumi from "@pulumi/pulumi";
import { bos_web_service_account } from "../compute/web-cloud-run";

export const bosAssetBucket = new gcp.storage.Bucket("bos-asset-bucket", {
  location: "us-central1",
  uniformBucketLevelAccess: true,
  storageClass: "STANDARD",
});

new gcp.storage.BucketIAMBinding("bos-asset-bucket-all-users-iam-binding", {
  bucket: bosAssetBucket.name,
  role: "roles/storage.objectViewer",
  members: ["allUsers"],
});

new gcp.storage.BucketIAMBinding("bos-asset-bucket-web-service-iam-binding", {
  bucket: bosAssetBucket.name,
  role: "roles/storage.objectUser",
  members: [
    pulumi.interpolate`serviceAccount:${bos_web_service_account.email}`,
  ],
});
