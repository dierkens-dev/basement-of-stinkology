import { prisma } from "~/services/prisma.server";

export default defineEventHandler(async () => {
  const activeEvent = await prisma.activeEvent.findFirst({
    where: { id: 1 },
    include: {
      event: {
        select: {
          name: true,
          slug: true,
          year: true,
        },
      },
    },
  });

  if (!activeEvent) {
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      cause: "No active event",
    });
  }

  return {
    data: activeEvent.event,
  };
});
