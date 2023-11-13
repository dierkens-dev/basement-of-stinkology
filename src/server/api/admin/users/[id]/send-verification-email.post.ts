import {
  sendEmailVerification,
  signInWithCustomToken,
  signOut,
} from "firebase/auth";
import { adminAuth, auth } from "~/features/auth";
import { prisma } from "~/services/prisma.server";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  const user = await prisma.user.findFirstOrThrow({
    where: {
      id,
    },
  });

  if (user.id === event.context.user.id) {
    throw createError({ status: 400, statusMessage: "Bad Request" });
  }

  const providerUser = await adminAuth.getUserByEmail(user.email);
  const customToken = await adminAuth.createCustomToken(providerUser.uid);
  const userCredential = await signInWithCustomToken(auth, customToken);
  await sendEmailVerification(userCredential.user);
  await signOut(auth);
});
