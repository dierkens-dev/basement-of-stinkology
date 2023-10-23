import { getServerSession } from "#auth";
import { z } from "zod";
import { movieDbClient } from "~/features/movies";
import { prisma } from "~/services/prisma.server";

const movieLogPostBodySchema = z.object({
  moviedbId: z.coerce.number(),
});

export default defineValidatedEventHandler(
  movieLogPostBodySchema,
  async (event) => {
    const session = await getServerSession(event);
    if (!session) {
      throw createError({ statusMessage: "Unauthenticated", statusCode: 403 });
    }

    const { moviedbId } = await readBody(event);

    let movie = await prisma.movie.findFirst({
      where: { themoviedbId: moviedbId },
    });

    if (!movie) {
      const moviedbJson = await movieDbClient.default.movieDetails({
        movieId: moviedbId,
      });

      movie = await prisma.movie.create({
        data: {
          themoviedbId: moviedbId,
          moviedbJson,
        },
      });
    }

    const userWatchListMovie = await prisma.userWatchListMovie.create({
      data: {
        userId: session.user.id,
        movieId: movie.id,
      },
      select: {
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
    });

    return {
      result: userWatchListMovie,
    };
  },
);
