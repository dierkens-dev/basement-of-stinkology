import { getServerSession } from "#auth";
import { movieDbClient } from "~/features/movies";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session) {
    throw createError({ statusMessage: "Unauthenticated", statusCode: 403 });
  }

  const { search } = getQuery(event);

  if (typeof search !== "string") {
    throw createError({ statusMessage: "Bad Request", statusCode: 400 });
  }

  setHeader(event, "Cache-Control", "max-age=60");

  return movieDbClient.default.searchMovie({
    query: search,
  });
});
