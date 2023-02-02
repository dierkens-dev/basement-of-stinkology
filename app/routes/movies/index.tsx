import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { MovieDbClient } from "~/services/moviedb.server";
import { prisma } from "~/services/prisma.server";
import { invariant } from "~/utils/invariant";

export async function loader() {
  const movies = await prisma.movie.findMany({
    orderBy: { createdAt: "desc" },
  });

  const moviesData = await Promise.all(
    movies.map(({ themoviedbId }) => MovieDbClient.movieInfo(themoviedbId))
  );

  const response = movies.map((movie) => {
    const movieDbDate = moviesData.find(({ id }) => id === movie.themoviedbId);

    invariant(movieDbDate, "Unable to map movieDbDate.");

    return {
      movieDbDate,
      movie,
    };
  });

  return json(response);
}

export default function MoviesIndexRoute() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="flex gap-4">
      {data &&
        data.map(({ movie, movieDbDate: { poster_path } }) => {
          return (
            <div key={movie.id} className="card w-38 bg-base-100 shadow-xl">
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
