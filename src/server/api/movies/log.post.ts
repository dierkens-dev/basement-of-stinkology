import { getServerSession } from "#auth";
import { z } from "zod";
import { movieDbClient } from "~/features/movies";
import { prisma } from "~/services/prisma.server";

const movieLogPostBodySchema = z.object({
  moviedbId: z.coerce.number(),
  eventSlug: z.string(),
});

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session) {
    throw createError({ statusMessage: "Unauthenticated", statusCode: 403 });
  }

  const body = await readBody(event);

  const result = movieLogPostBodySchema.safeParse(body);

  if (!result.success) {
    throw createError({ statusMessage: "Bad Request", statusCode: 400 });
  }

  const { moviedbId, eventSlug } = result.data;

  let movie = await prisma.movie.findFirst({
    where: { themoviedbId: moviedbId },
  });
  const bosEvent = await prisma.event.findFirst({ where: { slug: eventSlug } });

  if (!bosEvent) {
    throw createError({ statusMessage: "Bad Request", statusCode: 400 });
  }

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

  const movieView = await prisma.movieView.create({
    data: {
      viewDateTime: new Date(),
      eventId: bosEvent?.id,
      movieId: movie.id,
    },
    select: {
      viewDateTime: true,
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
    result: movieView,
  };
});
