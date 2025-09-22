import { z } from "zod";
import { codeSchema, passwordSchema } from "~/features/forms";

export const passwordUpdateSchema = z.object({
  code: codeSchema,
  password: passwordSchema,
});

export type PasswordUpdateErrors = z.inferFlattenedErrors<
  typeof passwordUpdateSchema
>;
