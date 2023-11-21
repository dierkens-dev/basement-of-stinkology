import { prisma } from "~/services/prisma.server";
import { sendEmailVerification } from "~/utils/email.util";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const host = getRequestHost(event);

  const user = await prisma.user.findFirstOrThrow({
    where: {
      id,
    },
  });

  if (user.id === event.context.user.id) {
    throw createError({ status: 400, statusMessage: "Bad Request" });
  }

  return await sendEmailVerification(user.email, host);
});
