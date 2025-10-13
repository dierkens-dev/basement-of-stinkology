import { prisma } from "~/services/prisma.server";

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");

  // Find the event by slug
  const eventData = await prisma.event.findFirst({
    where: { slug },
    select: { id: true },
  });

  if (!eventData) {
    throw createError({
      statusCode: 404,
      statusMessage: "Event not found",
    });
  }

  return prisma.userWatchListMovie.findMany({
    where: {
      userId: event.context.user.id,
      eventId: eventData.id,
    },
    select: {
      movie: true,
      id: true,
    },
  });
});
