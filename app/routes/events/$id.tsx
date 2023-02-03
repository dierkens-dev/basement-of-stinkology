import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { format } from "date-fns";
import { MovieDbClient } from "~/services/moviedb.server";
import { prisma } from "~/services/prisma.server";
import { invariant } from "~/utils/invariant";

export async function loader({ params }: LoaderArgs) {
  const id = params.id;

  const event = await prisma.event.findFirst({
    where: { id },
    include: {
      MovieViews: {
        orderBy: { viewDateTime: "asc" },
        include: {
          movie: true,
        },
      },
    },
  });

  if (!event) {
    throw new Response(null, { status: 404, statusText: "Not Found" });
  }

  const moviesData = await Promise.all(
    event.MovieViews.map(({ movie }) =>
      MovieDbClient.movieInfo(movie.themoviedbId)
    )
  );

  const movies = event.MovieViews.map((movieView) => {
    const movieDbData = moviesData.find(
      ({ id }) => id === movieView.movie.themoviedbId
    );

    invariant(movieDbData, "Unable to map movieDbDate.");

    return {
      movieDbData,
      movieView,
    };
  });

  return json({ movies, event });
}

export default function MoviesIndexRoute() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <h1 className="text-3xl font-bold">{data.event.name}</h1>

      {data.event.date ? (
        <p>{format(new Date(data.event.date), "PP")}</p>
      ) : null}

      <h2 className="text-2xl font-bold mt-3 mb-1">Movies</h2>

      <div className="grid gap-4 grid-cols-4 md:grid-cols-6">
        {data &&
          data.movies.map(
            ({ movieView: { movie }, movieDbData: { poster_path } }) => {
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
            }
          )}
      </div>
    </>
  );
}
