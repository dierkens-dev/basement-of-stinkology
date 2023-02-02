import { MovieDb } from "moviedb-promise";
import { invariant } from "~/utils/invariant";

invariant(
  typeof process.env.BOS_THE_MOVIE_DB_API_KEY === "string",
  "BOS_THE_MOVIE_DB_API_KEY is not set"
);

export const MovieDbClient = new MovieDb(process.env.BOS_THE_MOVIE_DB_API_KEY);
