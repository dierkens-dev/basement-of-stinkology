import * as gcp from "@pulumi/gcp";
// import * as pulumi from "@pulumi/pulumi";

export const bos_remix_function_sa = new gcp.serviceaccount.Account(
  `bos-remix-function-sa`,
  {
    accountId: `bos-remix-function-sa`,
    displayName: "Phyncrawler Metrics Service Account",
  }
);
