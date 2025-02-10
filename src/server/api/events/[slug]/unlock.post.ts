import { prisma } from "~/services/prisma.server";

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");

  const data = await prisma.event.update({
    where: { slug },
    data: {
      isLocked: false,
    },
  });

  return {
    data,
  };
});
