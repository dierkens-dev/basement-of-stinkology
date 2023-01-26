import * as gcp from "@pulumi/gcp";
import * as pulumi from "@pulumi/pulumi";
import { bos_remix_function_sa } from "../permissions/bos-remix-function-sa";
import {
  bos_remix_dist_zip_bucket_object,
  bos_remix_source_bucket,
} from "../storage/bos-remix-source-bucket";

export const bos_remix_cloud_function: gcp.cloudfunctions.Function =
  new gcp.cloudfunctions.Function(
    `bos-remix-cloud-function`,
    {
      name: `bos-remix-cloud-function`,
      description: "Remix served via cloud function",
      runtime: "nodejs16",
      region: "us-east1",
      entryPoint: "app",
      sourceArchiveBucket: bos_remix_source_bucket.name,
      sourceArchiveObject: bos_remix_dist_zip_bucket_object.name,
      triggerHttp: true,
      environmentVariables: {
        NODE_ENV: "production",
      },
      serviceAccountEmail: bos_remix_function_sa.email,
      httpsTriggerSecurityLevel: "secure-always",
    },
    {
      dependsOn: [
        bos_remix_source_bucket,
        bos_remix_dist_zip_bucket_object,
        bos_remix_function_sa,
      ],
    }
  );

export const bos_remix_function_invoker_role =
  new gcp.cloudfunctions.FunctionIamMember(
    `bos-remix-function-invoker-role`,
    {
      project: bos_remix_cloud_function.project,
      region: bos_remix_cloud_function.region,
      cloudFunction: bos_remix_cloud_function.name,
      role: "roles/cloudfunctions.invoker",
      member: "allUsers",
    },
    {
      dependsOn: [bos_remix_function_sa],
    }
  );
