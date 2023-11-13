import { prisma } from "~/services/prisma.server";
import { usersMePatchBodySchema } from "./-me.patch.schema";

export default defineValidatedEventHandler(
  usersMePatchBodySchema,
  async (event) => {
    const body = await readBody(event);

    return prisma.user.update({
      where: {
        id: event.context.user.id,
      },
      data: body,
    });
  },
);
