import { prisma } from "~/services/prisma.server";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  return await prisma.userWatchListMovie.findFirstOrThrow({
    where: {
      id,
      userId: event.context.user.id,
    },
    select: {
      id: true,
      movie: true,
    },
  });
});
