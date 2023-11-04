import { prisma } from "~/services/prisma.server";
import { invariant } from "~/utils/invariant";

export default defineEventHandler(async () => {
  const watchListMovies = await prisma.userWatchListMovie.findMany({
    distinct: ["movieId"],
    select: {
      movie: {
        select: {
          _count: true,
          id: true,
          createdAt: true,
          overview: true,
          poster: true,
          releaseDate: true,
          runtime: true,
          tagline: true,
          title: true,
          updatedAt: true,
        },
      },
      movieId: true,
      userId: true,
    },
    orderBy: {
      movie: {
        watchListMovies: {
          _count: "desc",
        },
      },
    },
  });

  const users = await prisma.user.findMany({
    where: {
      id: {
        in: watchListMovies.map(({ userId }) => userId),
      },
    },
  });

  const results = watchListMovies.map((watchListMovie) => {
    const user = users.find(({ id }) => watchListMovie.userId === id);
    invariant(user, "Could not find user for movie list movie");

    return {
      ...watchListMovie.movie,
      user,
    };
  });

  return {
    results,
  };
});
