import type { LoaderArgs } from "@remix-run/node";

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get("query");
  const page = url.searchParams.get("page");

  // &query=${query}&page=${page}&include_adult=false
  const fetchUrl = new URL(
    "https://api.themoviedb.org/3/search/movie?api_key=9736f8c3f5a1016f19874fabb351293f&language=en-US"
  );

  if (query) {
    fetchUrl.searchParams.append("query", query);
  }

  if (page) {
    fetchUrl.searchParams.append("page", page);
  }

  return fetch(fetchUrl.toString());
}
