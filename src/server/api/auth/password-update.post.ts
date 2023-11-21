import { confirmPasswordReset } from "firebase/auth";
import { z } from "zod";
import { auth } from "~/features/auth";
import { codeSchema, passwordSchema } from "~/features/forms";

const schema = z.object({
  code: codeSchema,
  password: passwordSchema,
});

export type PasswordUpdateErrors = z.inferFlattenedErrors<typeof schema>;

export default defineValidatedEventHandler(
  schema,
  async (event): Promise<void | PasswordUpdateErrors> => {
    const { code, password } = await readBody(event);

    await confirmPasswordReset(auth, code, password);

    sendNoContent(event);
  },
);
