import { Role } from "@prisma/client";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useActionData, useNavigation } from "@remix-run/react";
import { withZod } from "@remix-validated-form/with-zod";
import { ValidatedForm, validationError } from "remix-validated-form";
import { z } from "zod";
import { SubmitButton } from "~/components/submit-button";
import { TextField } from "~/components/text-field";
import { P } from "~/components/typeography/p";
import { getRedirectURL } from "~/features/auth";
import { authenticator } from "~/services/auth.server";
import { prisma } from "~/services/prisma.server";

const validator = withZod(
  z.object({
    name: z.string().min(1, "Name is required."),
    slug: z.string().min(1, "Slug is required."),
    date: z
      .string()
      .regex(/[0-9]{4}-[0-9]{2}-[0-9]{2}/, "Enter a valid date.")
      .optional(),
  })
);

export async function action({ request }: ActionArgs) {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: getRedirectURL({ request }),
  });

  if (user.role !== Role.ADMIN && user.role !== Role.EDITOR) {
    throw new Response(null, { status: 401, statusText: "Unauthorized" });
  }

  const formData = await request.formData();

  const result = await validator.validate(formData);

  if (result.error) {
    return validationError(result.error);
  }

  const { name, slug, date } = result.data;

  const event = await prisma.event.create({
    data: { name, slug, date: date && new Date(date) },
  });

  return json({
    message: `Event '${name}' was successfully added!`,
    result: event,
  });
}

export async function loader({ request }: LoaderArgs) {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: getRedirectURL({ request }),
  });

  if (user.role !== Role.ADMIN && user.role !== Role.EDITOR) {
    throw new Response(null, { status: 401, statusText: "Unauthorized" });
  }

  return null;
}

export default function Add() {
  const data = useActionData<typeof action>();
  const navigation = useNavigation();

  return (
    <ValidatedForm method="post" validator={validator}>
      <TextField name="name" label="Name" />
      <TextField name="slug" label="Slug" />
      <TextField name="date" label="Date" type="date" />

      {data && "message" in data ? (
        <P className="alert alert-success shadow-lg mb-3">{data.message}</P>
      ) : null}

      <SubmitButton
        isDisabled={navigation.state !== "idle"}
        isLoading={navigation.state !== "idle"}
      >
        Add Event
      </SubmitButton>
    </ValidatedForm>
  );
}
