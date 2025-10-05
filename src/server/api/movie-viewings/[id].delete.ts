import { prisma } from "~/services/prisma.server";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  return prisma.movieViewing.delete({
    where: {
      id,
    },
  });
});
