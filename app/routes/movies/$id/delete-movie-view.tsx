import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData, useNavigate, useTransition } from "@remix-run/react";
import { withZod } from "@remix-validated-form/with-zod";
import { format } from "date-fns";
import { useOverlayTriggerState } from "react-stately";
import { ValidatedForm, validationError } from "remix-validated-form";
import { z } from "zod";
import { Button } from "~/components/button";
import { Modal } from "~/components/modal";
import { SubmitButton } from "~/components/submit-button";
import { prisma } from "~/services/prisma.server";

const validator = withZod(
  z.object({
    movieViewId: z.string().uuid(),
  })
);

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  const id = url.searchParams.get("movieViewId");

  if (!id) {
    throw new Response(null, { status: 404, statusText: "Not Found" });
  }

  const movieView = await prisma.movieView.findFirst({ where: { id } });

  if (!movieView) {
    throw new Response(null, { status: 404, statusText: "Not Found" });
  }

  return json({ movieView });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  const result = await validator.validate(formData);

  if (result.error) {
    return validationError(result.error);
  }

  const { movieViewId } = result.data;

  const movieView = await prisma.movieView.delete({
    where: {
      id: movieViewId,
    },
  });

  return redirect(`/movies/${movieView.movieId}`);
}

export default function EditMovieViewRoute() {
  const navigate = useNavigate();
  const loaderData = useLoaderData<typeof loader>();

  const state = useOverlayTriggerState({
    defaultOpen: true,
  });

  const transition = useTransition();

  return (
    <Modal state={state}>
      <h2 className="text-3xl font-bold">Delete View</h2>

      <p>
        Are you sure you want to delete the view on{" "}
        {format(new Date(loaderData.movieView.viewDateTime), "PP pp")}
      </p>

      <ValidatedForm validator={validator} method="post">
        <input
          type="hidden"
          value={loaderData.movieView.id}
          name="movieViewId"
        />

        <div className="modal-action flex gap-3 justify-end">
          <Button className="btn-secondary" onPress={() => navigate("..")}>
            Cancel
          </Button>

          <SubmitButton
            isDisabled={Boolean(transition.submission)}
            isLoading={Boolean(transition.submission)}
            className="btn-error"
          >
            Delete
          </SubmitButton>
        </div>
      </ValidatedForm>
    </Modal>
  );
}
