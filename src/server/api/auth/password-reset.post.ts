import { sendPasswordResetEmail } from "firebase/auth";
import { auth, passwordResetPostSchema } from "~/features/auth";
import { defineValidatedEventHandler } from "~/server/utils/validated-handler.server";

export default defineValidatedEventHandler(
  passwordResetPostSchema,
  async (event) => {
    const { email } = await readBody(event);

    return sendPasswordResetEmail(auth, email);
  },
);
