import { webService } from "./compute/web-cloud-run";
import { bosAssetBucket } from "./storage/asset-bucket";

export const bosAssetBucketName = bosAssetBucket.name;
export const webServiceName = webService.name;
