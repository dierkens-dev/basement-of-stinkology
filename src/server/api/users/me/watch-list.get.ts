import { prisma } from "~/services/prisma.server";

export default defineEventHandler(async (event) => {
  const activeEvent = await prisma.activeEvent.findFirst({
    where: { id: 1 },
    select: { eventId: true },
  });

  if (!activeEvent) {
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      cause: "No active event",
    });
  }

  return prisma.userWatchListMovie.findMany({
    where: { userId: event.context.user.id, eventId: activeEvent.eventId },
    select: {
      movie: true,
      id: true,
    },
  });
});
