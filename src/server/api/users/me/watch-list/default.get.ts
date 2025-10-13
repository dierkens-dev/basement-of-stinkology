import { prisma } from "~/services/prisma.server";

export default defineEventHandler(async (event) => {
  return prisma.userWatchListMovie.findMany({
    where: {
      userId: event.context.user.id,
      eventId: null, // Get default watch list items (before event association)
    },
    select: {
      movie: true,
      id: true,
    },
  });
});
