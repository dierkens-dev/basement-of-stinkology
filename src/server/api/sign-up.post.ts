import { useSafeValidatedBody } from "h3-zod";
import { z } from "zod";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { FirebaseError } from "firebase/app";
import { getErrorMessage } from "../../lib/firebase-errors";

const schema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email("Must be a valid email."),
  password: z.string().min(1, "Password is required."),
});

export type SignUpErrors = z.inferFlattenedErrors<typeof schema>;

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const urlSearchParams = new URLSearchParams({
    email: body.email,
    password: body.password,
  });

  const result = await useSafeValidatedBody(
    event,
    z.object({
      email: z
        .string()
        .min(1, { message: "Email is required." })
        .email("Must be a valid email."),
      password: z.string().min(1, "Password is required."),
    }),
  );

  if (!result.success) {
    const errors = result.error.flatten() as SignUpErrors;

    urlSearchParams.set("error", JSON.stringify(errors));

    return sendRedirect(event, `/sign-up?${urlSearchParams.toString()}`);
  }

  const { email, password } = result.data;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    if (error instanceof FirebaseError) {
      urlSearchParams.set(
        "error",
        JSON.stringify({
          fieldErrors: {},
          formErrors: [getErrorMessage(error.code)],
        }),
      );

      return sendRedirect(event, `/sign-up?${urlSearchParams.toString()}`);
    }
  }

  return sendRedirect(event, "/sign-in");
});
