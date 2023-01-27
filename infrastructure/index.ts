// import { bos_remix_cloud_function } from "./functions/bos_remix_cloud_function";
import { remixService } from "./compute/remix-cloud-run";
import { bosPostgresInstance } from "./database/bos-postgresql";

export const bosRemixCloudRunRevisionName =
  remixService.autogenerateRevisionName;
export const bosPostgresInstancePublicIp = bosPostgresInstance.publicIpAddress;
