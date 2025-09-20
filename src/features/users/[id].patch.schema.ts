import { z } from "zod";
import { Role, RoleLevel } from "~/services/prisma.client";

// [Role, ...Role[]] tels TypeScript that the array has at least 1 role.
const keys = Object.keys(RoleLevel) as [Role, ...Role[]];

export const adminUsersPatchBodySchema = z.object({
  role: z.enum(keys).optional(),
  name: z.string().optional(),
});

export type AdminUsersPatchErrors = z.inferFlattenedErrors<
  typeof adminUsersPatchBodySchema
>;
