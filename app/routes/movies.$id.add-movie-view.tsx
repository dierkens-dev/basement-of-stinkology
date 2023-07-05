import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useNavigate, useParams, useTransition } from "@remix-run/react";
import { withZod } from "@remix-validated-form/with-zod";
import { format } from "date-fns";
import { useState } from "react";
import { useOverlayTriggerState } from "react-stately";
import { ValidatedForm, validationError } from "remix-validated-form";
import { z } from "zod";
import { Button } from "~/components/button";
import { Modal } from "~/components/modal";
import { SubmitButton } from "~/components/submit-button";
import { TextField } from "~/components/text-field";
import { H2 } from "~/components/typeography/h2";
import { getRedirectURL } from "~/features/auth";
import { authenticator } from "~/services/auth.server";
import { prisma } from "~/services/prisma.server";

const validator = withZod(
  z.object({
    viewDateTime: z.string().datetime(),
    movieId: z.string().uuid(),
    eventId: z.string().uuid(),
  }),
);

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  const result = await validator.validate(formData);

  if (result.error) {
    return validationError(result.error);
  }

  const { viewDateTime, movieId, eventId } = result.data;

  const movieView = await prisma.movieView.create({
    data: {
      movieId,
      eventId,
      viewDateTime: new Date(viewDateTime),
    },
  });

  return redirect(`/movies/${movieView.movieId}`);
}

export async function loader({ request }: LoaderArgs) {
  await authenticator.isAuthenticated(request, {
    failureRedirect: getRedirectURL({ request }),
  });

  return null;
}

export default function AddMovieViewRoute() {
  const navigate = useNavigate();
  const { id: movieId } = useParams();

  const state = useOverlayTriggerState({
    isOpen: true,
    onOpenChange: () => navigate(".."),
  });

  const transition = useTransition();
  const [viewDateTime, setViewDateTime] = useState(new Date());

  const handleViewDateTimeChange: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setViewDateTime(new Date(event.currentTarget.value));
  };

  return (
    <Modal state={state}>
      <H2>Add View</H2>

      <ValidatedForm validator={validator} method="post">
        <TextField
          label="View Time"
          type="hidden"
          name="viewDateTime"
          value={viewDateTime.toISOString()}
        >
          <input
            className="input input-bordered"
            type="datetime-local"
            value={format(viewDateTime, "yyyy-MM-dd'T'HH:mm")}
            onChange={handleViewDateTimeChange}
          />
        </TextField>

        <input
          type="hidden"
          value="ea2497fa-e7b1-4472-b213-76c45356e50d"
          name="eventId"
        />

        <input type="hidden" value={movieId} name="movieId" />

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
