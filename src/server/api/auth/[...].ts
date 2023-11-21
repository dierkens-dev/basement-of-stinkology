import { NuxtAuthHandler } from "#auth";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import type { CredentialsProvider } from "next-auth/providers/credentials";
import Credentials from "next-auth/providers/credentials";
import { auth } from "~/features/auth";
import { sendEmailVerification } from "~/utils/email.util";
import { prisma } from "../../../services/prisma.server";
import { invariant } from "../../../utils/invariant";

const CredentialsProvider = (
  Credentials as unknown as { default: CredentialsProvider }
).default;

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
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          throw new Error("No credentials");
        }
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
            await sendEmailVerification(
              userCredential.user.email,
              req?.headers?.host,
            );
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
