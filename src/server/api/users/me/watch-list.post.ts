import { z } from "zod";
import { movieDbClient } from "~/server/lib/moviedb.lib";
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

    // Check if the movie is already in user's watch list for this event
    const existingWatchListItem = await prisma.userWatchListMovie.findFirst({
      where: {
        userId: event.context.user.id,
        movieId: movie.id,
        eventId: activeEvent.eventId,
      },
    });

    if (existingWatchListItem) {
      // Already exists, just return it
      const userWatchListMovie = await prisma.userWatchListMovie.findUnique({
        where: { id: existingWatchListItem.id },
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
    }

    // Create new watch list item
    const userWatchListMovie = await prisma.userWatchListMovie.create({
      data: {
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
