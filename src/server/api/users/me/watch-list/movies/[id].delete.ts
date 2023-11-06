import { prisma } from "~/services/prisma.server";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  await prisma.userWatchListMovie.delete({
    where: {
      id,
      userId: event.context.user.id,
    },
  });
});
