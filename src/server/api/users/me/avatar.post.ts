import { Storage } from "@google-cloud/storage";
import crypto from "node:crypto";
import { Readable } from "node:stream";
import { prisma } from "~/services/prisma.server";
import { invariant } from "~/utils/invariant";

invariant(
  process.env.BOS_ASSET_BUCKET_NAME,
  "BOS_ASSET_BUCKET_NAME should be set",
);

const storage = new Storage();
const bucket = storage.bucket(process.env.BOS_ASSET_BUCKET_NAME);

export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event);

  const file = formData?.find(({ name }) => name === "file");
  const id = event.context.user.id;

  if (!file || !file.type) {
    throw createError({
      data: {
        file: "Please select a backdrop image.",
      },
      status: 400,
      statusMessage: "Bad Request",
    });
  }

  if (
    !["image/gif", "image/jpeg", "image/png", "image/webp"].includes(file.type)
  ) {
    throw createError({
      data: {
        file: `Unsupported media type "${file.type}".`,
      },
      status: 400,
      statusMessage: "Bad Request",
    });
  }

  const md5 = crypto.createHash("md5").update(file.data).digest("hex");
  const basePath = `users/${event.context.user.id}`;
  const bucketFile = bucket.file(`${basePath}/${md5}`);

  await new Promise((resolve, reject) => {
    Readable.from(file.data)
      .pipe(
        bucketFile.createWriteStream({
          resumable: false,
          validation: false,
          contentType: file.type,
        }),
      )
      .on("finish", resolve)
      .on("error", reject);
  });

  await prisma.user.update({
    where: {
      id,
    },
    data: {
      avatar: `https://storage.googleapis.com/${
        process.env.BOS_ASSET_BUCKET_NAME
      }/${basePath}/${encodeURIComponent(md5)}`,
    },
  });
});
