import { adminAuth } from "~/features/auth";
import { prisma } from "~/services/prisma.server";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  const user = await prisma.user.findFirstOrThrow({
    where: {
      id,
    },
  });

  const providerUser = await adminAuth.getUserByEmail(user.email);
  await adminAuth.deleteUser(await providerUser.uid);
  await prisma.user.delete({ where: { id } });
});
