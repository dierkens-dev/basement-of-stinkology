import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "~/features/auth";
import { defineValidatedEventHandler } from "~/server/utils/validated-handler.server";
import { passwordResetPostSchema } from "./-password-reset.post.schema";

export default defineValidatedEventHandler(
  passwordResetPostSchema,
  async (event) => {
    const { email } = await readBody(event);

    return sendPasswordResetEmail(auth, email);
  },
);
