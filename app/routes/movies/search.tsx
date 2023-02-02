import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { MovieDbClient } from "~/services/moviedb.server";
import { invariant } from "~/utils/invariant";

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get("query");
  const page = url.searchParams.get("page");

  invariant(typeof query === "string", "Query is missing.");

  const movieResultsResponse = await MovieDbClient.searchMovie({
    query,
    page: page ? parseInt(page, 10) : 1,
  });

  return json(movieResultsResponse);
}
