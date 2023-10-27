import { prisma } from "~/services/prisma.server";

export default defineEventHandler(async () => {
  const data = await prisma.event.findMany({
    where: {},
    select: {
      createdAt: true,
      date: true,
      id: true,
      name: true,
      slug: true,
      _count: {
        select: { MovieViews: true },
      },
      MovieViews: {
        select: {
          movie: {
            select: {
              runtime: true,
            },
          },
        },
      },
    },
  });

  return {
    data: data.map(({ MovieViews, ...event }) => {
      return {
        ...event,
        _sum: {
          runtime: MovieViews.reduce(
            (sum, view) =>
              typeof view.movie.runtime === "number"
                ? sum + view.movie.runtime
                : sum,
            0,
          ),
        },
      };
    }),
  };
});
