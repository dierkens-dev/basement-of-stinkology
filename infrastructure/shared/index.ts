import {
  bosPostgresDatabase,
  bosPostgresDevelopmentDatabase,
  bosPostgresInstance,
  bosPostgresShadowDatabase,
} from "./database/bos-postgresql";

import "./apis/enable-cloud-run";
import "./apis/enable-iam";

export const bosPostgresInstancePublicIp = bosPostgresInstance.publicIpAddress;
export const bosPostgresDatabaseName = bosPostgresDatabase.name;
export const bosPostgresShadowDatabaseName = bosPostgresShadowDatabase.name;
export const bosPostgresDevelopmentDatabaseName =
  bosPostgresDevelopmentDatabase.name;
export const bosPostgresInstanceConnectionName =
  bosPostgresInstance.connectionName;
