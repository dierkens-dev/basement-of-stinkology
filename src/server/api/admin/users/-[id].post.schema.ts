import { z } from "zod";
import { emailSchema } from "~/features/forms";

export const adminUsersPostBodySchema = z.object({
  email: emailSchema,
});

export type AdminUsersPostErrors = z.inferFlattenedErrors<
  typeof adminUsersPostBodySchema
>;
