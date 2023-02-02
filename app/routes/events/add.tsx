import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useActionData, useTransition } from "@remix-run/react";
import { withZod } from "@remix-validated-form/with-zod";
import { ValidatedForm, validationError } from "remix-validated-form";
import { z } from "zod";
import { SubmitButton } from "~/components/submit-button";
import { TextField } from "~/components/text-field";
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
  await authenticator.isAuthenticated(request, { failureRedirect: "/sign-in" });

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
  await authenticator.isAuthenticated(request, { failureRedirect: "/sign-in" });

  return null;
}

export default function Add() {
  const data = useActionData<typeof action>();
  const transition = useTransition();

  return (
    <ValidatedForm method="post" validator={validator}>
      <TextField name="name" label="Name" />
      <TextField name="slug" label="Slug" />
      <TextField name="date" label="Date" type="date" />

      {data && "message" in data ? (
        <p className="alert alert-success shadow-lg mb-3">{data.message}</p>
      ) : null}

      <SubmitButton
        isDisabled={Boolean(transition.submission)}
        isLoading={Boolean(transition.submission)}
      >
        Add Event
      </SubmitButton>
    </ValidatedForm>
  );
}
