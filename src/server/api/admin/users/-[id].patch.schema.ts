import { z } from "zod";
import { RoleLevel } from "~/services/prisma";

// [string, ...string[]] tels TypeScript that the array has at least 1 string.
const keys = Object.keys(RoleLevel) as [string, ...string[]];

export const adminUsersPatchBodySchema = z.object({
  role: z.enum(keys).optional(),
  name: z.string().optional(),
});

export type AdminUsersPatchErrors = z.inferFlattenedErrors<
  typeof adminUsersPatchBodySchema
>;
