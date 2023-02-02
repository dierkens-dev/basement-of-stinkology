import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useActionData, useLoaderData, useTransition } from "@remix-run/react";
import { withZod } from "@remix-validated-form/with-zod";
import { format } from "date-fns";
import { ValidatedForm, validationError } from "remix-validated-form";
import { z } from "zod";
import { SubmitButton } from "~/components/submit-button";
import { TextField } from "~/components/text-field";
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

const validator = withZod(
  z.object({
    viewDateTime: z.string(),
    timezoneOffset: z.string(),
    movieId: z.string().uuid(),
    eventId: z.string().uuid(),
  })
);

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  const result = await validator.validate(formData);

  if (result.error) {
    return validationError(result.error);
  }

  const { viewDateTime, movieId, eventId, timezoneOffset } = result.data;

  const view = new Date(`${viewDateTime}:00.000${timezoneOffset}`);

  const movieView = await prisma.movieView.create({
    data: {
      movieId,
      eventId,
      viewDateTime: view,
    },
  });

  return json({ addedMovieView: movieView });
}

export default function MovieIdRoute() {
  const {
    movie,
    movieDbData: { poster_path, title, tagline },
    movieViews,
  } = useLoaderData<typeof loader>();
  const transition = useTransition();
  const data = useActionData<typeof action>();

  const views =
    data && "addedMovieView" in data
      ? [...movieViews, data.addedMovieView]
      : movieViews;

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

        <table className="table border border-base-300 w-full">
          <thead>
            <tr>
              <th>Event</th>
              <th>View Time</th>
            </tr>
          </thead>
          <tbody>
            {views.map(({ id, viewDateTime, eventId }) => {
              return (
                <tr key={id}>
                  <th>{eventId}</th>
                  <td>{format(new Date(viewDateTime), "PP pp")}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <ValidatedForm
          validator={validator}
          method="post"
          className="flex items-end"
        >
          <TextField
            label="View Time"
            name="viewDateTime"
            type="datetime-local"
            defaultValue={format(new Date(), "yyyy-MM-dd'T'hh:ss")}
          />

          <input
            type="hidden"
            name="timezoneOffset"
            defaultValue={format(new Date(), "xxx")}
          />

          <input
            type="hidden"
            value="ea2497fa-e7b1-4472-b213-76c45356e50d"
            name="eventId"
          />

          <input type="hidden" value={movie.id} name="movieId" />

          <SubmitButton
            isDisabled={Boolean(transition.submission)}
            isLoading={Boolean(transition.submission)}
            className="m-3"
          >
            Add View
          </SubmitButton>
        </ValidatedForm>
      </section>
    </div>
  );
}
