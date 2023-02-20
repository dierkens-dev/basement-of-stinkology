import { Role } from "@prisma/client";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { format } from "date-fns";
import { TiDelete, TiEdit } from "react-icons/ti";
import { H1 } from "~/components/typeography/h1";
import { H2 } from "~/components/typeography/h2";
import { P } from "~/components/typeography/p";
import { authenticator } from "~/services/auth.server";
import { MovieDbClient } from "~/services/moviedb.server";
import { prisma } from "~/services/prisma.server";

export async function loader({ params, request }: LoaderArgs) {
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
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/sign-in",
  });

  return json({
    user,
    movieDbData,
    movie,
  });
}

export default function MovieIdRoute() {
  const {
    movieDbData: { poster_path, title, tagline },
    movie,
    user,
  } = useLoaderData<typeof loader>();

  return (
    <div>
      <section className="hero bg-base-200 justify-start">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src={`https://image.tmdb.org/t/p/w185/${poster_path}`}
            alt="Movie poster"
          />
          <div>
            <H1>{title}</H1>
            <P className="py-6">{tagline}</P>
          </div>
        </div>
      </section>

      <hr className="divider" />

      <section>
        <H2>Views</H2>

        <table className="table table-normal border border-base-300 w-full">
          <thead>
            <tr>
              <th>Event</th>
              <th>View Time</th>
              {user.role === Role.ADMIN || user.role === Role.EDITOR ? (
                <th>Actions</th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {movie.MovieViews.map((movieView) => {
              const { id, viewDateTime, event } = movieView;
              return (
                <tr key={id}>
                  <th>
                    <Link
                      className="link link-primary"
                      to={`/events/${event.id}`}
                    >
                      {event.name}
                    </Link>
                  </th>
                  <td>{format(new Date(viewDateTime), "PP pp")}</td>
                  {user.role === Role.ADMIN || user.role === Role.EDITOR ? (
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
                        <span className="sr-only">Delete</span>
                        <TiDelete className="w-full h-full" />
                      </Link>
                    </td>
                  ) : null}
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="flex justify-end p-2">
          {user.role === Role.ADMIN || user.role === Role.EDITOR ? (
            <Link className="btn btn-primary" to="add-movie-view">
              Add Movie View
            </Link>
          ) : null}
        </div>

        <Outlet />
      </section>
    </div>
  );
}
