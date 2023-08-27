import CredentialsProvider from "next-auth/providers/credentials";
import { NuxtAuthHandler } from "#auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../lib/firebase";
import { prisma } from "../../../services/prisma.server";
import { FirebaseError } from "firebase/app";
import { getErrorMessage } from "../../../lib/firebase-errors";
import { invariant } from "../../../utils/invariant";
import { Session } from "next-auth";

export default NuxtAuthHandler({
  // A secret string you define, to ensure correct encryption
  secret: process.env.BOS_SESSION_STORAGE_SECRET,
  callbacks: {
    // Callback when the JWT is created / updated, see https://next-auth.js.org/configuration/callbacks#jwt-callback
    jwt: async ({ token, user }) => {
      token.user = user || token.user;

      return Promise.resolve(token);
    },
    // Callback whenever session is checked, see https://next-auth.js.org/configuration/callbacks#session-callback
    session: async ({ session, token, newSession, trigger, user }) => {
      console.log({ session, token, newSession, trigger, user });
      session.user = token.user as Session["user"];

      return Promise.resolve(session);
    },
  },
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    CredentialsProvider.default({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "(hint: jsmith)",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "(hint: hunter2)",
        },
      },
      async authorize(credentials: any) {
        console.log("credentials", credentials);
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
          console.log("user authorize!!!!!!!!!", user);
          return user;
        } catch (error) {
          if (error instanceof FirebaseError) {
            console.error(error);
            // throw createError({
            //   status: 403,
            //   message: getErrorMessage(error.message),
            // });
            return null;
          }

          throw error;
        }
      },
    }),
  ],
});
