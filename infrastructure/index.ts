// import { bos_remix_cloud_function } from "./functions/bos_remix_cloud_function";
import { remixService } from "./remix-cloud-run";

// export const bos_remix_cloud_function_url =
//   bos_remix_cloud_function.httpsTriggerUrl;

export const bosRemixCloudRunUrl = remixService.urn;
