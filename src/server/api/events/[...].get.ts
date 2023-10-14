import { getServerSession } from "#auth";
import { prisma } from "~/services/prisma.server";

const router = createRouter();

router.get(
  "/:eventId",
  defineEventHandler(async (event) => {
    const session = await getServerSession(event);
    if (!session) {
      throw createError({ statusMessage: "Unauthenticated", statusCode: 403 });
    }

    const id = getRouterParam(event, "eventId");

    const data = await prisma.event.findFirst({
      where: { tenant: session.user.tenant, id },
      select: {
        createdAt: true,
        date: true,
        id: true,
        name: true,
        slug: true,
      },
    });

    return {
      data,
    };
  }),
);

router.get(
  "/:eventId/movies",
  defineEventHandler(async (event) => {
    const session = await getServerSession(event);
    if (!session) {
      throw createError({ statusMessage: "Unauthenticated", statusCode: 403 });
    }

    const eventId = getRouterParam(event, "eventId");

    const data = await prisma.movieView.findMany({
      where: { tenant: session.user.tenant, eventId },
      select: {
        movie: {
          select: {
            createdAt: true,
            id: true,
            updatedAt: true,
          },
        },
      },
    });

    return {
      data: data.map((movieView) => movieView.movie),
    };
  }),
);

export default useBase("/api/events", router.handler);
