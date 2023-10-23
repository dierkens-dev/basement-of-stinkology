import { getServerSession } from "#auth";
import { prisma } from "~/services/prisma.server";

export default defineEventHandler(async (event) => {
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
              id: true,
              title: true,
              releaseDate: true,
              tagline: true,
              overview: true,
              poster: true,
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
});
