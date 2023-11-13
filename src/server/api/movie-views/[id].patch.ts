import { prisma } from "~/services/prisma.server";
import { eventMoviePatchBodySchema } from "./-[id].patch.schema";

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
