import CredentialsProvider from "next-auth/providers/credentials";
import { NuxtAuthHandler } from "#auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../lib/firebase";
import { prisma } from "../../../services/prisma.server";
import { FirebaseError } from "firebase/app";
import { invariant } from "../../../utils/invariant";
import { Session } from "next-auth";

export default NuxtAuthHandler({
  secret: process.env.BOS_SESSION_STORAGE_SECRET,
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      token.user = user || token.user;

      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user as Session["user"];

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

          const user = await prisma.user.upsert({
            where: { email: userCredential.user.email },
            update: {},
            create: { email: userCredential.user.email },
          });

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
