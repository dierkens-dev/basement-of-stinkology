import { eventsPostBodySchema } from "~/features/events";
import { prisma } from "~/services/prisma.server";

export default defineValidatedEventHandler(
  eventsPostBodySchema,
  async (event) => {
    const { year, name, slug } = await readBody(event);

    return await prisma.event.create({
      data: {
        name,
        slug,
        year,
      },
    });
  },
);
