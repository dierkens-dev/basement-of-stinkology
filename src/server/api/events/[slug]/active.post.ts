import { prisma } from "~/services/prisma.server";

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");

  const bosEvent = await prisma.event.findFirstOrThrow({
    where: { slug },
    select: {
      id: true,
      activeEvent: true,
      createdAt: true,
      name: true,
      slug: true,
      backdropUrl: true,
      isLocked: true,
      year: true,
    },
  });

  if (bosEvent.activeEvent) {
    return {
      data: bosEvent,
    };
  }

  const active = await prisma.activeEvent.update({
    where: { id: 1 },
    data: { eventId: bosEvent.id },
    include: { event: true }, // fetches the latest event data
  });

  return {
    data: active.event,
  };
});
