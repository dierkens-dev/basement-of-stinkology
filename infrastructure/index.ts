// import { bos_remix_cloud_function } from "./functions/bos_remix_cloud_function";
import { remixService } from "./compute/remix-cloud-run";
import {
  bosPostgresDatabase,
  bosPostgresInstance,
  bosPostgresShadowDatabase,
} from "./database/bos-postgresql";

export const remixServiceName = remixService.name;
export const bosPostgresInstancePublicIp = bosPostgresInstance.publicIpAddress;
export const bosPostgresDatabaseName = bosPostgresDatabase.name;
export const bosPostgresShadowDatabaseName = bosPostgresShadowDatabase.name;
