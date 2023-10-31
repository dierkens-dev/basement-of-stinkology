import { Storage } from "@google-cloud/storage";
import { Readable } from "node:stream";
import { invariant } from "~/utils/invariant";

invariant(
  process.env.BOS_ASSET_BUCKET_NAME,
  "BOS_ASSET_BUCKET_NAME should be set",
);

const storage = new Storage();
const bucket = storage.bucket(process.env.BOS_ASSET_BUCKET_NAME);

export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event);
  const slug = getRouterParam(event, "slug");
  const path = `${slug}/backdrop`;

  const file = formData?.find(({ name }) => name === "file");

  if (!file) {
    throw createError({ status: 400, statusMessage: "Bad Request" });
  }

  if (file) {
    const bucketFile = bucket.file(path);

    await new Promise((resolve, reject) => {
      Readable.from(file.data)
        .pipe(
          bucketFile.createWriteStream({
            resumable: false,
            validation: false,
            contentType: "application/octet-stream",
          }),
        )
        .on("finish", resolve)
        .on("error", reject);
    });
  }
});
