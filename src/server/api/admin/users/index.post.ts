import { adminUsersPostBodySchema } from "~/features/users";
import { prisma } from "~/services/prisma.server";
import { sendEmailInvitation } from "~/utils/email.util";

export default defineValidatedEventHandler(
  adminUsersPostBodySchema,
  async (event) => {
    const body = await readBody(event);

    const user = await prisma.user.create({
      data: body,
    });

    await sendEmailInvitation(user.email, getRequestHost(event));

    return user;
  },
);
