import { Role } from "@prisma/client";

export { Role };

export const RoleLevel: Record<Role, number> = {
  VIEWER: 100,
  EDITOR: 200,
  ADMIN: 300,
};
