import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { MovieDbClient } from "~/services/moviedb.server";
import { prisma } from "~/services/prisma.server";
import { invariant } from "~/utils/invariant";

export async function loader({ params }: LoaderArgs) {
  const id = params.id;

  const movieViews = await prisma.movieView.findMany({
    where: { eventId: id },
    orderBy: { viewDateTime: "asc" },
    include: {
      movie: true,
    },
  });

  const moviesData = await Promise.all(
    movieViews.map(({ movie }) => MovieDbClient.movieInfo(movie.themoviedbId))
  );

  const response = movieViews.map((movieView) => {
    const movieDbData = moviesData.find(
      ({ id }) => id === movieView.movie.themoviedbId
    );

    invariant(movieDbData, "Unable to map movieDbDate.");

    return {
      movieDbData,
      movieView,
    };
  });

  return json(response);
}

export default function MoviesIndexRoute() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="flex gap-4">
      {data &&
        data.map(({ movieView: { movie }, movieDbData: { poster_path } }) => {
          return (
            <div
              key={movie.id}
              className="card w-38 bg-base-100 shadow-xl hover:scale-110 transition-transform"
            >
              <figure>
                <Link to={`/movies/${movie.id}`}>
                  <img
                    className="object-contain"
                    src={`https://www.themoviedb.org/t/p/w154/${poster_path}`}
                    alt="Movie"
                  />
                </Link>
              </figure>
            </div>
          );
        })}
    </div>
  );
}
