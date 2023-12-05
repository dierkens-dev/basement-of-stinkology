import type { Role, User } from "@prisma/client";

export { Role };

export const RoleLevel: Record<Role, number> = {
  VIEWER: 100,
  EDITOR: 200,
  ADMIN: 300,
};

export function isRoleLevel(user: User, role: Role) {
  return RoleLevel[user.role] >= RoleLevel[role];
}

export function isAdmin(user?: User) {
  return user && user.emailVerified && isRoleLevel(user, "ADMIN");
}

export function isEditor(user?: User) {
  return user && user.emailVerified && isRoleLevel(user, "EDITOR");
}

export function isViewer(user?: User) {
  return user && isRoleLevel(user, "VIEWER");
}
