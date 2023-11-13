import { NuxtAuthHandler } from "#auth";
import { FirebaseError } from "firebase/app";
import {
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { auth } from "~/features/auth";
import { prisma } from "../../../services/prisma.server";
import { invariant } from "../../../utils/invariant";

export default NuxtAuthHandler({
  secret: process.env.BOS_SESSION_STORAGE_SECRET,
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    jwt: async ({ token }) => {
      return token;
    },
    session: async ({ session, token }) => {
      session.user = await prisma.user.findFirstOrThrow({
        where: {
          id: token.sub,
        },
      });

      return session;
    },
  },
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    CredentialsProvider.default({
      async authorize(credentials: { email: string; password: string }) {
        const { email, password } = credentials;

        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password,
          );

          invariant(
            typeof userCredential.user.email === "string",
            "Email not found on user credential.",
          );

          invariant(
            typeof userCredential.user.tenantId === "string",
            "Tenant not found on user credential.",
          );

          const user = await prisma.user.upsert({
            where: {
              email: userCredential.user.email,
            },
            update: { emailVerified: userCredential.user.emailVerified },
            create: {
              emailVerified: userCredential.user.emailVerified,
              email: userCredential.user.email,
            },
          });

          if (!user.emailVerified) {
            await sendEmailVerification(userCredential.user);
          }

          return user;
        } catch (error) {
          if (error instanceof FirebaseError) {
            return null;
          }

          throw error;
        }
      },
    }),
  ],
});
