import * as gcp from "@pulumi/gcp";
import * as pulumi from "@pulumi/pulumi";

const config = new pulumi.Config();

const BOS_POSTGRES_USER = config.get("BOS_POSTGRES_USER");
const BOS_POSTGRES_PASSWORD = config.get("BOS_POSTGRES_PASSWORD");

export const bosPostgresInstance = new gcp.sql.DatabaseInstance(
  "bos-postgres-instance",
  {
    region: "us-central1",
    databaseVersion: "POSTGRES_14",
    settings: {
      tier: "db-f1-micro",
    },
    deletionProtection: true,
  }
);

export const bosPostgresDatabase = new gcp.sql.Database(
  "bos-postgres-database",
  {
    instance: bosPostgresInstance.name,
    deletionPolicy: "ABANDON",
  }
);

export const bosPostgresShadowDatabase = new gcp.sql.Database(
  "bos-postgres-shadow-database",
  {
    instance: bosPostgresInstance.name,
    deletionPolicy: "ABANDON",
  }
);

export const bosPostgresUser = new gcp.sql.User("bos-postgres-user", {
  instance: bosPostgresInstance.name,
  name: BOS_POSTGRES_USER,
  password: BOS_POSTGRES_PASSWORD,
});
