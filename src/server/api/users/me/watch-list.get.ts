import { getServerSession } from "#auth";
import { prisma } from "~/services/prisma.server";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session) {
    throw createError({ statusMessage: "Unauthenticated", statusCode: 403 });
  }

  return prisma.userWatchListMovie.findMany({
    where: { userId: session.user.id },
    select: {
      movie: true,
    },
  });
});
