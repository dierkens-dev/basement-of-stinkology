import { FirebaseError } from "firebase/app";
import type { User } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { auth } from "~/lib/firebase";
import { getErrorMessage } from "~/lib/firebase-errors";
import { sessionStorage } from "~/services/session.server";
import { invariant } from "~/utils/invariant";

export let authenticator = new Authenticator<User>(sessionStorage);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get("email");
    const password = form.get("password");

    console.log({ email, password });

    invariant(
      typeof email === "string" && email.length,
      "Please provide your email address."
    );
    invariant(
      typeof password === "string" && password.length,
      "Please provide your password."
    );

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // TODO: Find or create in mongo
      return userCredential.user;
    } catch (error) {
      if (error instanceof FirebaseError) {
        throw new Error(getErrorMessage(error.code));
      }

      throw error;
    }
  }),
  "user-pass"
);
