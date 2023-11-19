import { adminAuth } from "~/features/auth";
import { transport } from "~/services/nodemailer";
import { prisma } from "~/services/prisma.server";

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

  const emailVerificationLink = await adminAuth.generateEmailVerificationLink(
    user.email,
  );

  const url = new URL(emailVerificationLink);
  url.host = host;

  return await transport.sendMail({
    from: "Basement of Stinkology noreply@basementofstinkology.app",
    to: user.email,
    subject: "Verify your email for Basement of Stinkology",
    text: `Hello!\n\nPlease verify your email by clicking on the following link:\n\n${url.toString()}\n\nThanks!\n\nThe Basement of Stinkology Team`,
  });
});
