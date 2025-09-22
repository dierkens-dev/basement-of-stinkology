import { usersMePatchBodySchema } from "~/features/me";
import { prisma } from "~/services/prisma.server";

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
