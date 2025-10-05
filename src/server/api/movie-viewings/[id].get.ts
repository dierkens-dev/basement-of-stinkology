import { prisma } from "~/services/prisma.server";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  return prisma.movieViewing.findFirstOrThrow({
    where: {
      id,
    },
    select: {
      id: true,
      movie: true,
      viewingTime: true,
    },
  });
});
