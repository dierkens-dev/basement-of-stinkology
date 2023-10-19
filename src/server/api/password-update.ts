import { FirebaseError } from "firebase/app";
import { confirmPasswordReset } from "firebase/auth";
import { z } from "zod";
import { auth, getErrorMessage } from "~/features/auth";
import { codeSchema, passwordSchema } from "~/features/forms";

const schema = z.object({
  code: codeSchema,
  password: passwordSchema,
});

export type PasswordUpdateErrors = z.inferFlattenedErrors<typeof schema>;

export default defineEventHandler(
  async (event): Promise<void | PasswordUpdateErrors> => {
    const body = await readBody(event);
    const result = schema.safeParse(body);

    if (!result.success) {
      setResponseStatus(event, 400, "Bad Request");
      return result.error.flatten();
    }

    const { code, password } = result.data;

    try {
      await confirmPasswordReset(auth, code, password);
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
