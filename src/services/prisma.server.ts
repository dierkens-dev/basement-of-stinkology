import { Prisma, PrismaClient } from "@prisma/client";

let client: PrismaClient;

declare global {
  // eslint-disable-next-line no-var
  var __db: PrismaClient | undefined;
}

// this is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.
if (process.env.NODE_ENV === "production") {
  client = new PrismaClient();
} else {
  if (!global.__db) {
    global.__db = new PrismaClient();
  }
  client = global.__db;
}

function getValueAtPath(json: Prisma.JsonValue, key: string) {
  return json && typeof json === "object" && key in json
    ? json[key as keyof typeof json]
    : undefined;
}

const prisma = client.$extends({
  result: {
    movie: {
      title: {
        needs: { moviedbJson: true },
        compute(movie) {
          return getValueAtPath(movie.moviedbJson, "title");
        },
      },
      overview: {
        needs: { moviedbJson: true },
        compute(movie) {
          return getValueAtPath(movie.moviedbJson, "overview");
        },
      },
      tagline: {
        needs: { moviedbJson: true },
        compute(movie) {
          return getValueAtPath(movie.moviedbJson, "tagline");
        },
      },
      releaseDate: {
        needs: { moviedbJson: true },
        compute(movie) {
          return getValueAtPath(movie.moviedbJson, "release_date");
        },
      },
      runtime: {
        needs: { moviedbJson: true },
        compute(movie) {
          return getValueAtPath(movie.moviedbJson, "runtime");
        },
      },
      poster: {
        needs: { moviedbJson: true },
        compute(movie) {
          return `https://image.tmdb.org/t/p/original${getValueAtPath(
            movie.moviedbJson,
            "poster_path",
          )}`;
        },
      },
    },
  },
});

export { prisma };
