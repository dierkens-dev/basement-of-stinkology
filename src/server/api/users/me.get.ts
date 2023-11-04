import { prisma } from "~/services/prisma.server";

export default defineEventHandler(async (event) => {
  return prisma.user.findFirst({
    where: { id: event.context.user.id },
  });
});
