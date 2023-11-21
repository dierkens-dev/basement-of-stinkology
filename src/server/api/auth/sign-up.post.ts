import { createUserWithEmailAndPassword } from "firebase/auth";
import { z } from "zod";
import { auth } from "~/features/auth";
import { emailSchema, passwordSchema } from "~/features/forms";
import { sendEmailVerification } from "~/utils/email.util";

const schema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type SignUpErrors = z.inferFlattenedErrors<typeof schema>;

export default defineValidatedEventHandler(
  schema,
  async (event): Promise<void | SignUpErrors> => {
    const { email, password } = await readBody(event);
    const host = getRequestHost(event);

    await createUserWithEmailAndPassword(auth, email, password);

    await sendEmailVerification(email, host);

    sendNoContent(event);
  },
);
