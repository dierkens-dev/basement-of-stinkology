import { confirmPasswordReset } from "firebase/auth";
import {
  auth,
  passwordUpdateSchema,
  type PasswordUpdateErrors,
} from "~/features/auth";

export default defineValidatedEventHandler(
  passwordUpdateSchema,
  async (event): Promise<void | PasswordUpdateErrors> => {
    const { code, password } = await readBody(event);

    await confirmPasswordReset(auth, code, password);

    sendNoContent(event);
  },
);
