import { webService } from "./compute/web-cloud-run";
import {
  bosPostgresDatabase,
  bosPostgresDevelopmentDatabase,
  bosPostgresInstance,
  bosPostgresShadowDatabase,
} from "./database/bos-postgresql";
import { bosAssetBucket } from "./storage/asset-bucket";

export const bosPostgresInstancePublicIp = bosPostgresInstance.publicIpAddress;
export const bosPostgresDatabaseName = bosPostgresDatabase.name;
export const bosPostgresShadowDatabaseName = bosPostgresShadowDatabase.name;
export const bosPostgresDevelopmentDatabaseName =
  bosPostgresDevelopmentDatabase.name;
export const bosAssetBucketUrn = bosAssetBucket.urn;
export const webServiceUrn = webService.urn;
