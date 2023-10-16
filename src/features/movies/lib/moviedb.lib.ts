import { invariant } from "~/utils/invariant";
import { MovieDbClient } from "./moviedb";

invariant(process.env.BOS_TENANT_ID, "BOS_TENANT_ID should be set");

export const movieDbClient = new MovieDbClient({
  TOKEN: process.env.BOS_THE_MOVIE_DB_API_TOKEN,
});
