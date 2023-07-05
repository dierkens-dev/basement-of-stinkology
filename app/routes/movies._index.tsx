import { Role } from "@prisma/client";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { H1 } from "~/components/typeography/h1";
import { authenticator } from "~/services/auth.server";
import { MovieDbClient } from "~/services/moviedb.server";
import { prisma } from "~/services/prisma.server";
import { invariant } from "~/utils/invariant";

export async function loader({ request }: LoaderArgs) {
  const movies = await prisma.movie.findMany({
    orderBy: { createdAt: "desc" },
  });

  const moviesData = await Promise.all(
    movies.map(({ themoviedbId }) => MovieDbClient.movieInfo(themoviedbId)),
  );

  const response = movies.map((movie) => {
    const movieDbData = moviesData.find(({ id }) => id === movie.themoviedbId);

    invariant(movieDbData, "Unable to map movieDbDate.");

    return {
      movieDbData,
      movie,
    };
  });

  const user = await authenticator.isAuthenticated(request);

  return json({ movies: response, user });
}

export default function MoviesIndexRoute() {
  const { movies, user } = useLoaderData<typeof loader>();

  return (
    <>
      <H1>Movies</H1>
      <div className="grid gap-4 grid-cols-4 md:grid-cols-6">
        {movies &&
          movies.map(({ movie, movieDbData: { poster_path } }) => {
            return (
              <div
                key={movie.id}
                className="shadow-xl hover:scale-110 transition-transform"
              >
                <figure>
                  <Link to={`/movies/${movie.id}`}>
                    <img
                      className="object-contain w-full"
                      src={`https://www.themoviedb.org/t/p/w342/${poster_path}`}
                      alt="Movie"
                    />
                  </Link>
                </figure>
              </div>
            );
          })}
      </div>

      {user?.role === Role.ADMIN || user?.role === Role.EDITOR ? (
        <div className="flex py-3">
          <Link className="btn btn-primary" to="add">
            Add Movie
          </Link>
        </div>
      ) : null}
    </>
  );
}
