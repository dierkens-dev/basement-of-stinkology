import {
  bosPostgresDatabase,
  bosPostgresDevelopmentDatabase,
  bosPostgresInstance,
  bosPostgresShadowDatabase,
} from "./database/bos-postgresql";

export const bosPostgresInstancePublicIp = bosPostgresInstance.publicIpAddress;
export const bosPostgresDatabaseName = bosPostgresDatabase.name;
export const bosPostgresShadowDatabaseName = bosPostgresShadowDatabase.name;
export const bosPostgresDevelopmentDatabaseName =
  bosPostgresDevelopmentDatabase.name;
