import { getServerSession } from "#auth";
import { prisma } from "~/services/prisma.server";

const router = createRouter();

router.get(
  "/:slug",
  defineEventHandler(async (event) => {
    const session = await getServerSession(event);
    if (!session) {
      throw createError({ statusMessage: "Unauthenticated", statusCode: 403 });
    }

    const slug = getRouterParam(event, "slug");

    const data = await prisma.event.findFirst({
      where: { slug },
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
  "/:slug/movies",
  defineEventHandler(async (event) => {
    const session = await getServerSession(event);
    if (!session) {
      throw createError({ statusMessage: "Unauthenticated", statusCode: 403 });
    }

    const slug = getRouterParam(event, "slug");

    const data = await prisma.event.findFirst({
      where: { slug },
      select: {
        MovieViews: {
          select: {
            viewDateTime: true,
            movie: {
              select: {
                title: true,
                releaseDate: true,
                tagline: true,
                overview: true,
              },
            },
          },
          orderBy: {
            viewDateTime: "asc",
          },
        },
      },
    });

    return {
      data,
    };
  }),
);

export default useBase("/api/events", router.handler);
