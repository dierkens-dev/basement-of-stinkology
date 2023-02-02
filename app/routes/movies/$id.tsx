import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { MovieDbClient } from "~/services/moviedb.server";
import { prisma } from "~/services/prisma.server";

export async function loader({ params }: LoaderArgs) {
  const id = params.id;

  const movie = await prisma.movie.findFirst({ where: { id } });

  if (!movie) {
    throw new Response(null, { status: 404, statusText: "Not Found" });
  }

  const movieDbData = await MovieDbClient.movieInfo(movie.themoviedbId);

  return json({
    movieDbData,
    movie,
  });
}

export default function MovieIdRoute() {
  const data = useLoaderData<typeof loader>();

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
