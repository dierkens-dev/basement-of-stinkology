import { adminAuth } from "~/features/auth";
import { prisma } from "~/services/prisma.server";

export default defineEventHandler(async () => {
  const listUsersResult = await adminAuth.listUsers();

  const emails = listUsersResult.users
    .map(({ email }) => email)
    .filter(Boolean);

  const users = await prisma.user.findMany({
    orderBy: {
      email: "asc",
    },
  });

  return users.map((user) => ({
    ...user,
    isRegistered: emails.includes(user.email),
  }));
});
