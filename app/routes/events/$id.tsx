import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { format } from "date-fns";
import { H1 } from "~/components/typeography/h1";
import { H2 } from "~/components/typeography/h2";
import { P } from "~/components/typeography/p";
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
      <H1>{data.event.name}</H1>

      {data.event.date ? (
        <P>{format(new Date(data.event.date), "PP")}</P>
      ) : null}

      <H2>Movies</H2>

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
