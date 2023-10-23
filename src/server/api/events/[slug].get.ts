import { getServerSession } from "#auth";
import { prisma } from "~/services/prisma.server";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session) {
    throw createError({ statusMessage: "Unauthenticated", statusCode: 403 });
  }

  const slug = getRouterParam(event, "slug");

  const data = await prisma.event.findFirst({
    where: { slug },
    select: {
      createdAt: true,
      date: true,
      id: true,
      name: true,
      slug: true,
    },
  });

  return {
    data,
  };
});
