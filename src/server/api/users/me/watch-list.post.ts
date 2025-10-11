import { z } from "zod";
import { movieDbClient } from "~/features/movies";
import { prisma } from "~/services/prisma.server";

const movieLogPostBodySchema = z.object({
  moviedbId: z.coerce.number(),
});

export default defineValidatedEventHandler(
  movieLogPostBodySchema,
  async (event) => {
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

    const activeEvent = await prisma.activeEvent.findFirst({
      where: { id: 1 },
      select: { eventId: true },
    });

    if (!activeEvent) {
      throw createError({
        statusCode: 500,
        statusMessage: "Internal Server Error",
        cause: "No active event",
      });
    }

    const userWatchListMovie = await prisma.userWatchListMovie.upsert({
      where: {
        userId_movieId: {
          userId: event.context.user.id,
          movieId: movie.id,
        },
      },
      update: {},
      create: {
        userId: event.context.user.id,
        movieId: movie.id,
        eventId: activeEvent.eventId,
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
