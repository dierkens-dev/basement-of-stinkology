import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useSafeValidatedBody } from "h3-zod";
import { z } from "zod";
import { auth } from "../../lib/firebase";
import { getErrorMessage } from "../../lib/firebase-errors";

const schema = z.object({
  email: z
    .string({ required_error: "Email is required." })
    .email("Must be a valid email."),
  password: z.string({ required_error: "Password is required." }),
});

export type SignUpErrors = z.inferFlattenedErrors<typeof schema>;

export default defineEventHandler(
  async (
    event,
  ): Promise<{ error: SignUpErrors; success: false } | { success: true }> => {
    const result = await useSafeValidatedBody(event, schema);

    if (!result.success) {
      setResponseStatus(event, 400, "Bad Request");

      return { error: result.errors.flatten() };
    }

    const { email, password } = result.data;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error instanceof FirebaseError) {
        return {
          error: { fieldErrors: {}, formErrors: [getErrorMessage(error.code)] },
        };
      }

      throw error;
    }

    return { success: true };
  },
);
