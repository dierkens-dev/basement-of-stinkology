import { prisma } from "~/services/prisma.server";

export default defineEventHandler(async (event) => {
  return prisma.userWatchListMovie.findMany({
    where: { userId: event.context.user.id },
    select: {
      movie: true,
    },
  });
});
