import { Role } from "@prisma/client";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData, useNavigation } from "@remix-run/react";
import React from "react";
import type { AriaTextFieldOptions } from "react-aria";
import { useTextField } from "react-aria";
import { FormControl } from "~/components/form-control";
import { Input } from "~/components/input";
import { Label } from "~/components/label";
import { SubmitButton } from "~/components/submit-button";
import { H2 } from "~/components/typeography/h2";
import { P } from "~/components/typeography/p";
import { getRedirectURL } from "~/features/auth";
import { authenticator } from "~/services/auth.server";
import { MovieDbClient } from "~/services/moviedb.server";
import { prisma } from "~/services/prisma.server";
import { invariant } from "~/utils/invariant";

type TextFieldProps = Omit<AriaTextFieldOptions<"input">, "name" | "label"> &
  Required<Pick<AriaTextFieldOptions<"input">, "name" | "label">>;

export async function loader({ request }: LoaderArgs) {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: getRedirectURL({ request }),
  });

  if (user.role !== Role.ADMIN && user.role !== Role.EDITOR) {
    throw new Response(null, { status: 401, statusText: "Unauthorized" });
  }

  const url = new URL(request.url);
  const query = url.searchParams.get("query");
  const page = url.searchParams.get("page");

  if (!query) {
    return json(null);
  }

  const movieResultsResponse = await MovieDbClient.searchMovie({
    query,
    page: page ? parseInt(page, 10) : 1,
  });

  return json(movieResultsResponse);
}

function SearchField(props: TextFieldProps) {
  const { label } = props;
  const navigation = useNavigation();

  const ref = React.useRef<HTMLInputElement | null>(null);

  const { labelProps, inputProps } = useTextField(props, ref);

  return (
    <FormControl>
      <Label className="sr-only" {...labelProps} suppressHydrationWarning>
        {label}
      </Label>

      <div className="input-group">
        <Input
          className="w-full"
          {...inputProps}
          suppressHydrationWarning
          ref={ref}
        />

        <SubmitButton
          isDisabled={navigation.state !== "idle"}
          isLoading={navigation.state !== "idle"}
        >
          Search
        </SubmitButton>
      </div>
    </FormControl>
  );
}

export async function action({ request }: ActionArgs) {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: getRedirectURL({ request }),
  });

  if (user.role !== Role.ADMIN && user.role !== Role.EDITOR) {
    throw new Response(null, { status: 401, statusText: "Unauthorized" });
  }

  const formData = await request.formData();
  const themoviedbId = await formData.get("themoviedbId");

  invariant(typeof themoviedbId === "string", "Movie Id is missing");

  const event = await prisma.movie.create({
    data: { themoviedbId: parseInt(themoviedbId, 10) },
  });

  return redirect(`/movies/${event.id}`);
}

export default function Add() {
  const data = useLoaderData<typeof loader>();
  const navigation = useNavigation();

  return (
    <div>
      <Form method="get">
        <SearchField name="query" label="Search" />
      </Form>

      <div>
        {data && "results" in data
          ? data.results?.map(
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
                      <H2 className="card-title">
                        {title}
                        <span className="text-sm">({release_date})</span>
                      </H2>

                      <P title={overview} className="line-clamp">
                        {overview}
                      </P>

                      <div className="card-actions justify-end">
                        <Form method="post" noValidate>
                          <input type="hidden" value={id} name="themoviedbId" />

                          <SubmitButton
                            isDisabled={navigation.state !== "idle"}
                            isLoading={navigation.state !== "idle"}
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
