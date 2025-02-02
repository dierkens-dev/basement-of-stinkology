import limit from "promise-limit";
import { movieDbClient } from "~/features/movies";
import { prisma } from "~/services/prisma.server";

export default defineEventHandler(async () => {
  const movies = await prisma.movie.findMany();
  const limiter =
    limit<Awaited<ReturnType<typeof movieDbClient.default.movieDetails>>>(3);

  const jobs = movies.map((movie) => {
    return limiter(() =>
      movieDbClient.default.movieDetails({ movieId: movie.themoviedbId }),
    );
  });

  const movieDbJson = await Promise.allSettled(jobs);

  const updated = [];
  for (const json of movieDbJson) {
    try {
      if (typeof json.value.id !== "number") {
        continue;
      }

      const result = await prisma.movie.update({
        where: {
          themoviedbId: json.value.id,
        },
        data: {
          moviedbJson: json.value,
          ttl: Date.now() + 86400000,
        },
      });

      updated.push(result);
    } catch (e) {
      //ignore
    }
  }
  return { updated };
});
