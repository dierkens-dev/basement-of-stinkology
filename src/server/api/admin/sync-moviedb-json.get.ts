import { getServerSession } from "#auth";
import { Role } from "@prisma/client";
import limit from "promise-limit";
import { movieDbClient } from "~/features/movies";
import { prisma } from "~/services/prisma.server";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session || session.user.role > Role.ADMIN) {
    throw createError({ statusMessage: "Unauthenticated", statusCode: 403 });
  }

  const movies = await prisma.movie.findMany();
  const limiter =
    limit<Awaited<ReturnType<typeof movieDbClient.default.movieDetails>>>(3);

  const jobs = movies.map((movie) => {
    return limiter(() =>
      movieDbClient.default.movieDetails({ movieId: movie.themoviedbId }),
    );
  });

  const movieDbJson = await Promise.all(jobs);

  const updated = [];
  for (const json of movieDbJson) {
    if (typeof json.id !== "number") {
      continue;
    }

    const result = await prisma.movie.update({
      where: {
        themoviedbId: json.id,
      },
      data: {
        moviedbJson: json,
      },
    });

    updated.push(result);
  }

  return { updated };
});
