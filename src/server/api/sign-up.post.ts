import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";
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
interface SignUpErrorResponse {
  error: SignUpErrors;
  success: false;
}
interface SignUpSuccessResponse {
  success: true;
}
type SignUpResponse = SignUpErrorResponse | SignUpSuccessResponse;

export default defineEventHandler(async (event): Promise<SignUpResponse> => {
  const body = await readBody(event);
  const result = schema.safeParse(body);

  if (!result.success) {
    setResponseStatus(event, 400, "Bad Request");
    return { error: result.error.flatten(), success: false };
  }

  const { email, password } = result.data;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    if (error instanceof FirebaseError) {
      return {
        success: false,
        error: { fieldErrors: {}, formErrors: [getErrorMessage(error.code)] },
      };
    }

    throw error;
  }

  return { success: true };
});
