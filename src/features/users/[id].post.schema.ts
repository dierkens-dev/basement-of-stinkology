import { z } from "zod";
import { emailSchema } from "~/features/forms";
import { Role, RoleLevel } from "~/services/prisma.client";

// [Role, ...Role[]] tels TypeScript that the array has at least 1 role.
const keys = Object.keys(RoleLevel) as [Role, ...Role[]];

export const adminUsersPostBodySchema = z.object({
  email: emailSchema,
  role: z.enum(keys).optional(),
});

export type AdminUsersPostErrors = z.inferFlattenedErrors<
  typeof adminUsersPostBodySchema
>;
