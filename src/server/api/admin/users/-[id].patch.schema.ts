import { z } from "zod";
import { Role } from "~/services/prisma";

export const adminUsersPatchBodySchema = z.object({
  role: z.enum([Role.ADMIN, Role.EDITOR, Role.VIEWER]).optional(),
  name: z.string().optional(),
});

export type AdminUsersPatchErrors = z.inferFlattenedErrors<
  typeof adminUsersPatchBodySchema
>;
