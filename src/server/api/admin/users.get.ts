import { adminAuth } from "~/features/auth";
import { prisma } from "~/services/prisma.server";

export default defineEventHandler(async () => {
  const listUsersResult = await adminAuth.listUsers();

  const emails = listUsersResult.users
    .map(({ email }) => email)
    .filter(Boolean);

  return prisma.user.findMany({
    where: {
      email: {
        in: emails,
      },
    },
    orderBy: {
      email: "asc",
    },
  });
});
