import { prisma } from "~/services/prisma.server";

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");

  const data = await prisma.event.findFirst({
    where: { slug },
    select: {
      backdropUrl: true,
      createdAt: true,
      id: true,
      isLocked: true,
      name: true,
      slug: true,
      year: true,
    },
  });

  return {
    data,
  };
});
