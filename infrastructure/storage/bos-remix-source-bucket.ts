import * as gcp from "@pulumi/gcp";
import * as pulumi from "@pulumi/pulumi";

export const bos_remix_source_bucket = new gcp.storage.Bucket(
  `bos-remix-source-bucket`,
  {
    location: "US",
    uniformBucketLevelAccess: true,
  }
);

const assetArchive = new pulumi.asset.AssetArchive({
  "package.json": new pulumi.asset.FileAsset("../package.json"),
  "yarn.lock": new pulumi.asset.FileAsset("../yarn.lock"),
  "app.js": new pulumi.asset.FileAsset("../app.js"),
  build: new pulumi.asset.FileArchive("../build"),
  public: new pulumi.asset.FileArchive("../public"),
});

export const bos_remix_dist_zip_bucket_object = new gcp.storage.BucketObject(
  `bos-remix-dist-zip-bucket-object`,
  {
    bucket: bos_remix_source_bucket.name,
    source: assetArchive,
  }
);
