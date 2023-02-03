import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { format } from "date-fns";
import { TiDelete, TiEdit } from "react-icons/ti";
import { MovieDbClient } from "~/services/moviedb.server";
import { prisma } from "~/services/prisma.server";

export async function loader({ params }: LoaderArgs) {
  const id = params.id;

  if (!id) {
    throw new Response(null, { status: 404, statusText: "Not Found" });
  }

  const movie = await prisma.movie.findFirst({
    where: { id },
    include: {
      MovieViews: {
        include: {
          event: true,
        },
      },
    },
  });

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
  const {
    movieDbData: { poster_path, title, tagline },
    movie,
  } = useLoaderData<typeof loader>();

  return (
    <div>
      <section className="hero bg-base-200">
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
      </section>

      <hr className="divider" />

      <section>
        <h2 className="text-4xl font-bold">Views</h2>

        <table className="table table-normal border border-base-300 w-full">
          <thead>
            <tr>
              <th>Event</th>
              <th>View Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {movie.MovieViews.map((movieView) => {
              const { id, viewDateTime, event } = movieView;
              return (
                <tr key={id}>
                  <th>{event.name}</th>
                  <td>{format(new Date(viewDateTime), "PP pp")}</td>
                  <td className="flex gap-2">
                    <Link
                      to={{
                        pathname: "edit-movie-view",
                        search: `movieViewId=${id}`,
                      }}
                      preventScrollReset
                      className="btn-circle btn-sm btn-outline text-warning p-1"
                    >
                      <span className="sr-only">Edit</span>
                      <TiEdit className="w-full h-full" />
                    </Link>

                    <Link
                      to={{
                        pathname: "delete-movie-view",
                        search: `movieViewId=${id}`,
                      }}
                      preventScrollReset
                      className="btn-circle btn-sm btn-outline text-error p-1"
                    >
                      <span className="sr-only">Edit</span>
                      <TiDelete className="w-full h-full" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="flex justify-end p-2">
          <Link className="btn btn-primary" to="add-movie-view">
            Add Movie View
          </Link>
        </div>

        <Outlet />
      </section>
    </div>
  );
}
