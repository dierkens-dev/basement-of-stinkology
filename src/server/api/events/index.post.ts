import { prisma } from "~/services/prisma.server";
import { eventsPostBodySchema } from "./-index.post.schema";

export default defineValidatedEventHandler(
  eventsPostBodySchema,
  async (event) => {
    const { date, name, slug } = await readBody(event);

    return await prisma.event.create({
      data: {
        name,
        slug,
        date,
      },
    });
  },
);
