import { movieDbClient } from "~/features/movies";

export default defineEventHandler(async (event) => {
  const { search } = getQuery(event);

  if (typeof search !== "string") {
    throw createError({ statusMessage: "Bad Request", statusCode: 400 });
  }

  setHeader(event, "Cache-Control", "max-age=60");

  return movieDbClient.default.searchMovie({
    query: search,
  });
});
