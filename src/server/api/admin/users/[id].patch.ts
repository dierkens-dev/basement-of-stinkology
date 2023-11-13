import { prisma } from "~/services/prisma.server";
import { adminUsersPatchBodySchema } from "./-[id].patch.schema";

export default defineValidatedEventHandler(
  adminUsersPatchBodySchema,
  async (event) => {
    const id = getRouterParam(event, "id");
    const body = await readBody(event);

    return prisma.user.update({
      where: {
        id,
      },
      data: body,
    });
  },
);
