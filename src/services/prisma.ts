import type { Role } from "./prisma.server";

export const RoleLevel: Record<Role, number> = {
  VIEWER: 100,
  EDITOR: 200,
  ADMIN: 300,
};
