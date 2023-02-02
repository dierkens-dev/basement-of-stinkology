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
  const movieViews = await prisma.movieView.findMany({
    where: {
      movieId: movie.id,
    },
  });

  return json({
    movieDbData,
    movie,
    movieViews,
  });
}

export default function MovieIdRoute() {
  const {
    movie,
    movieDbData: { poster_path, title, tagline },
    movieViews,
  } = useLoaderData<typeof loader>();

  return (
    <div>
      <div className="hero bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src={`https://image.tmdb.org/t/p/w185/${poster_path}`}
            alt="Movie poster"
          />
          <div>
            <h1 className="text-5xl font-bold">{title}</h1>
            <p className="py-6">{tagline}</p>
          </div>
        </div>
      </div>

      <div>
        <pre>{JSON.stringify(movieViews, null, 2)}</pre>
      </div>
    </div>
  );
}
