import { getServerSession } from "#auth";
import { applyActionCode } from "firebase/auth";
import { auth } from "~/features/auth";
import { prisma } from "~/services/prisma.server";

export default defineEventHandler(async (event) => {
  const searchParams = new URLSearchParams(
    event.path.slice(event.path.lastIndexOf("?")),
  );

  const code = searchParams.get("oobCode");
  const mode = searchParams.get("mode");

  if (!code || !mode) {
    return createError({ statusMessage: "Bad Request", statusCode: 400 });
  }

  switch (mode) {
    case "resetPassword": {
      return sendRedirect(event, `/password-update?${searchParams.toString()}`);
    }
    case "verifyEmail": {
      await applyActionCode(auth, code);

      const session = await getServerSession(event);
      if (session) {
        await prisma.user.update({
          where: { id: session.user.id },
          data: { emailVerified: true },
        });
      }

      return sendRedirect(event, `/email-verified`);
    }
    default: {
      return createError({ statusMessage: "Bad Request", statusCode: 400 });
    }
  }
});
