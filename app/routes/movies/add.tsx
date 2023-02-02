import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useFetcher, useTransition } from "@remix-run/react";
import type { MovieResultsResponse } from "moviedb-promise";
import React from "react";
import type { AriaTextFieldOptions } from "react-aria";
import { useTextField } from "react-aria";
import { FormControl } from "~/components/form-control";
import { Input } from "~/components/input";
import { Label } from "~/components/label";
import { SubmitButton } from "~/components/submit-button";
import { authenticator } from "~/services/auth.server";
import { prisma } from "~/services/prisma.server";
import { invariant } from "~/utils/invariant";

type TextFieldProps = Omit<AriaTextFieldOptions<"input">, "name" | "label"> &
  Required<Pick<AriaTextFieldOptions<"input">, "name" | "label">>;

export function TextField(props: TextFieldProps) {
  const { label } = props;

  const ref = React.useRef<HTMLInputElement | null>(null);

  const { labelProps, inputProps } = useTextField(props, ref);

  return (
    <FormControl>
      <Label {...labelProps} suppressHydrationWarning>
        {label}
      </Label>

      <Input {...inputProps} suppressHydrationWarning ref={ref} />
    </FormControl>
  );
}

export async function action({ request }: ActionArgs) {
  await authenticator.isAuthenticated(request, { failureRedirect: "/sign-in" });

  const formData = await request.formData();
  const themoviedbId = await formData.get("themoviedbId");

  invariant(typeof themoviedbId === "string", "Movie Id is missing");

  const event = await prisma.movie.create({
    data: { themoviedbId: parseInt(themoviedbId, 10) },
  });

  return redirect(`/movies/${event.id}`);
}

export default function Add() {
  const fetcher = useFetcher<MovieResultsResponse>();
  const { submission } = useTransition();

  return (
    <div>
      <fetcher.Form method="get" action="/movies/search">
        <TextField name="query" label="Search" />

        <SubmitButton
          isDisabled={Boolean(submission)}
          isLoading={Boolean(submission)}
        >
          Search
        </SubmitButton>
      </fetcher.Form>

      <div>
        {fetcher.data?.results
          ? fetcher.data.results.map(
              ({ id, title, overview, poster_path, release_date }) => {
                return (
                  <div
                    key={id}
                    className="card card-side bg-base-100 shadow-xl my-4 p-1"
                  >
                    <figure className="w-48">
                      <img
                        className="object-contain"
                        src={`https://www.themoviedb.org/t/p/w185/${poster_path}`}
                        alt="Movie"
                      />
                    </figure>
                    <div className="card-body w-full">
                      <h2 className="card-title">
                        {title}
                        <span className="text-sm">({release_date})</span>
                      </h2>

                      <p title={overview} className="line-clamp">
                        {overview}
                      </p>

                      <div className="card-actions justify-end">
                        <Form method="post" noValidate>
                          <input type="hidden" value={id} name="themoviedbId" />
                          <SubmitButton
                            isDisabled={Boolean(submission)}
                            isLoading={Boolean(submission)}
                          >
                            Add Movie
                          </SubmitButton>
                        </Form>
                      </div>
                    </div>
                  </div>
                );
              }
            )
          : null}
      </div>
    </div>
  );
}
