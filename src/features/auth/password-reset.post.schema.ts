import { z } from "zod";
import { emailSchema } from "~/features/forms";

export const passwordResetPostSchema = z.object({
  email: emailSchema,
});

export type PasswordResetPostBody = z.infer<typeof passwordResetPostSchema>;
export type PasswordResetPostErrors = z.inferFlattenedErrors<
  typeof passwordResetPostSchema
>;
