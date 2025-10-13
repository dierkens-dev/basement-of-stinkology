import { prisma } from "~/services/prisma.server";

export default defineEventHandler(async () => {
  const data = await prisma.event.findMany({
    select: {
      activeEvent: true,
      createdAt: true,
      id: true,
      name: true,
      slug: true,
      isLocked: true,
      year: true,
      _count: {
        select: { movieViewing: true },
      },
      movieViewing: {
        select: {
          movie: {
            select: {
              runtime: true,
            },
          },
        },
      },
    },
    orderBy: { year: "desc" },
  });

  return {
    data: data.map(({ movieViewing, ...event }) => {
      return {
        ...event,
        _sum: {
          runtime: movieViewing.reduce(
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
