import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { z } from "zod";
import { auth, getErrorMessage } from "~/features/auth";
import { emailSchema, passwordSchema } from "~/features/forms";

const schema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type SignUpErrors = z.inferFlattenedErrors<typeof schema>;

export default defineEventHandler(
  async (event): Promise<void | SignUpErrors> => {
    const body = await readBody(event);
    const result = schema.safeParse(body);

    if (!result.success) {
      setResponseStatus(event, 400, "Bad Request");
      return result.error.flatten();
    }

    const { email, password } = result.data;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
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
