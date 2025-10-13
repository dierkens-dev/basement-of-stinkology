import limit from "promise-limit";
import { movieDbClient } from "~/server/lib/moviedb.lib";
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
  const failed = movieDbJson.filter((result) => result.status === "rejected");
  const success = movieDbJson.filter(
    <T>(
      result: PromiseFulfilledResult<T> | PromiseRejectedResult,
    ): result is PromiseFulfilledResult<T> => result.status === "fulfilled",
  );

  const updated = [];
  for (const json of success) {
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
        },
      });

      updated.push(result);
    } catch (e) {
      //ignore
    }
  }
  return { updated, failed: failed.length };
});
