import { getServerSession } from "#auth";
import { RoleLevel } from "~/services/prisma.client";

export default defineEventHandler(async (event) => {
  if (!event.path.startsWith("/api") && !event.path.startsWith("/admin")) {
    return;
  }

  // No session required.
  if (event.path.startsWith("/api/auth")) {
    return;
  }

  const session = await getServerSession(event);

  // Not logged in.
  if (!session) {
    throw createError({ statusMessage: "Unauthenticated", statusCode: 403 });
  }

  // Admin only apis.
  if (
    (event.path.startsWith("/api/admin") || event.path.startsWith("/admin")) &&
    RoleLevel[session.user.role] < RoleLevel["ADMIN"]
  ) {
    throw createError({ statusMessage: "Unauthorized", statusCode: 400 });
  }

  // All other api endpoints.
  if (
    event.method.toUpperCase() === "POST" &&
    (RoleLevel[session.user.role] < RoleLevel["EDITOR"] ||
      !session.user.emailVerified)
  ) {
    throw createError({ statusMessage: "Unauthorized", statusCode: 400 });
  }

  if (
    event.method.toUpperCase() === "GET" &&
    RoleLevel[session.user.role] < RoleLevel["VIEWER"]
  ) {
    throw createError({ statusMessage: "Unauthorized", statusCode: 400 });
  }

  event.context.user = session.user;
});
