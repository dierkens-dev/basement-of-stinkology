import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { z } from "zod";
import { auth } from "~/features/auth";
import { emailSchema, passwordSchema } from "~/features/forms";

const schema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type SignUpErrors = z.inferFlattenedErrors<typeof schema>;

export default defineValidatedEventHandler(
  schema,
  async (event): Promise<void | SignUpErrors> => {
    const { email, password } = await readBody(event);

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    await sendEmailVerification(userCredential.user);

    setResponseStatus(event, 204, "No Content");
  },
);
