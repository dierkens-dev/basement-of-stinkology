import { adminUsersPatchBodySchema } from "~/features/users";
import { prisma } from "~/services/prisma.server";

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
