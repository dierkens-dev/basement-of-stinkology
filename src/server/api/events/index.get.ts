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
  });

  return {
    data: data
      .map(({ movieViewing, ...event }) => {
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
      })
      .sort((a, b) => {
        const dt1 = new Date(a.createdAt).getDate();
        const dt2 = new Date(b.createdAt).getDate();
        if (dt1 < dt2) {
          return 1;
        }
        if (dt1 > dt2) {
          return -1;
        }
        return 0;
      }),
  };
});
