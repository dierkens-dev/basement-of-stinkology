import { eventMoviePatchBodySchema } from "~/features/movies";
import { prisma } from "~/services/prisma.server";

export default defineValidatedEventHandler(
  eventMoviePatchBodySchema,
  async (event) => {
    const id = getRouterParam(event, "id");
    const body = await readBody(event);

    return prisma.movieView.update({
      where: {
        id,
      },
      data: body,
    });
  },
);
