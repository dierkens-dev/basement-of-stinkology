import * as gcp from "@pulumi/gcp";

export const bosAssetBucket = new gcp.storage.Bucket("bos-asset-bucket", {
  location: "us-central1",
  uniformBucketLevelAccess: false,
  storageClass: "STANDARD",
});

new gcp.storage.BucketAccessControl("publicRule", {
  bucket: bosAssetBucket.name,
  role: "READER",
  entity: "allUsers",
});
