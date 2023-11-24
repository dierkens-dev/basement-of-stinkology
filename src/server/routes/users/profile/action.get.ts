import { FirebaseError } from "firebase/app";
import { applyActionCode, checkActionCode } from "firebase/auth";
import { auth, getErrorMessage } from "~/features/auth";
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
    case "signIn": {
      return sendRedirect(
        event,
        `/sign-in-with-email?${searchParams.toString()}`,
      );
    }
    case "verifyEmail": {
      try {
        const { data } = await checkActionCode(auth, code);
        await applyActionCode(auth, code);

        const searchParams = new URLSearchParams();

        if (data.email) {
          await prisma.user.update({
            where: { email: data.email },
            data: { emailVerified: true },
          });

          searchParams.set("email", data.email);
        }

        return sendRedirect(
          event,
          `/email-verified?${searchParams.toString()}`,
        );
      } catch (error) {
        if (error instanceof FirebaseError) {
          throw createError({
            statusMessage: getErrorMessage(error.code),
            statusCode: 400,
          });
        }

        throw error;
      }
    }
    default: {
      return createError({ statusMessage: "Bad Request", statusCode: 400 });
    }
  }
});
