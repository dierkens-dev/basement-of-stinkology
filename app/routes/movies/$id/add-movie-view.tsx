import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useNavigate, useTransition } from "@remix-run/react";
import { withZod } from "@remix-validated-form/with-zod";
import { format } from "date-fns";
import { useOverlayTriggerState } from "react-stately";
import { ValidatedForm, validationError } from "remix-validated-form";
import { z } from "zod";
import { Button } from "~/components/button";
import { Modal } from "~/components/modal";
import { SubmitButton } from "~/components/submit-button";
import { TextField } from "~/components/text-field";
import { prisma } from "~/services/prisma.server";

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

  return redirect(`/movies/${movieView.movieId}`);
}

export default function AddMovieViewRoute() {
  const navigate = useNavigate();

  const state = useOverlayTriggerState({
    isOpen: true,
    onOpenChange: () => navigate(".."),
  });

  const transition = useTransition();

  return (
    <Modal state={state}>
      <h2 className="text-3xl font-bold">Add View</h2>

      <ValidatedForm validator={validator} method="post">
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

        {/* <input type="hidden" value={movie.id} name="movieId" /> */}

        <div className="modal-action flex gap-3 justify-end">
          <Button className="btn-secondary" onPress={state.close}>
            Cancel
          </Button>

          <SubmitButton
            isDisabled={Boolean(transition.submission)}
            isLoading={Boolean(transition.submission)}
          >
            Add View
          </SubmitButton>
        </div>
      </ValidatedForm>
    </Modal>
  );
}
