import * as gcp from "@pulumi/gcp";

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
