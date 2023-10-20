import { FirebaseError } from "firebase/app";
import { sendPasswordResetEmail } from "firebase/auth";
import { z } from "zod";
import { auth, getErrorMessage } from "~/features/auth";
import { emailSchema } from "~/features/forms";

const schema = z.object({
  email: emailSchema,
});

export type PasswordResetErrors = z.inferFlattenedErrors<typeof schema>;

export default defineEventHandler(
  async (event): Promise<void | PasswordResetErrors> => {
    const body = await readBody(event);
    const result = schema.safeParse(body);

    if (!result.success) {
      setResponseStatus(event, 400, "Bad Request");
      return result.error.flatten();
    }

    const { email } = result.data;

    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      if (error instanceof FirebaseError) {
        setResponseStatus(event, 400, "Bad Request");
        return { fieldErrors: {}, formErrors: [getErrorMessage(error.code)] };
      }

      throw error;
    }

    setResponseStatus(event, 204, "No Content");
  },
);
