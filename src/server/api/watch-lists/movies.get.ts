import { prisma } from "~/services/prisma.server";

export default defineEventHandler(async () => {
  const watchListMovies = await prisma.userWatchListMovie.findMany({
    select: {
      movie: {
        select: {
          _count: true,
          backdrop: true,
          createdAt: true,
          genres: true,
          id: true,
          overview: true,
          poster: true,
          releaseDate: true,
          runtime: true,
          tagline: true,
          title: true,
          updatedAt: true,
          voteAverage: true,
        },
      },
      user: true,
      movieId: true,
    },
    orderBy: {
      movie: {
        watchListMovies: {
          _count: "desc",
        },
      },
    },
  });

  type WatchListMovie = (typeof watchListMovies)[number];

  type Result = Omit<(typeof watchListMovies)[number], "user"> & {
    users: Array<WatchListMovie["user"]>;
  };

  const results = watchListMovies.reduce<Record<Result["movieId"], Result>>(
    (acc, { user, ...value }) => {
      if (!acc[value.movieId]) {
        acc[value.movieId] = {
          ...value,
          users: [],
        };
      }

      acc[value.movieId].users.push(user);

      return acc;
    },
    {},
  );

  return {
    results,
  };
});
