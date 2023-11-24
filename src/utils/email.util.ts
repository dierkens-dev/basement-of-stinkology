import { adminAuth } from "~/features/auth";
import { transport } from "~/services/nodemailer";

export async function sendEmailVerification(email: string, host: string) {
  const emailVerificationLink =
    await adminAuth.generateEmailVerificationLink(email);

  const url = new URL(emailVerificationLink);
  url.host = host;

  if (host.startsWith("localhost")) {
    url.protocol = "http";
  }

  return transport.sendMail({
    from: "Basement of Stinkology noreply@basementofstinkology.app",
    to: email,
    subject: "Verify your email for the Basement of Stinkology",
    text: `Hello!\n\nPlease verify your email by clicking on the following link:\n\n${url.toString()}\n\nThanks!\n\nThe Basement of Stinkology Team`,
  });
}

export async function sendEmailInvitation(email: string, host: string) {
  const signInWithEmailLink = await adminAuth.generateSignInWithEmailLink(
    email,
    {
      url: `https://${host}/`,
      handleCodeInApp: false,
    },
  );

  const url = new URL(signInWithEmailLink);
  url.host = host;

  if (host.startsWith("localhost")) {
    url.protocol = "http";
  }

  url.searchParams.set("email", email);

  return transport.sendMail({
    from: "Basement of Stinkology noreply@basementofstinkology.app",
    to: email,
    subject: "You've been invited to the Basement of Stinkology",
    text: `Hello!\n\nYou've been invited to the Basement of Stinkology. Please sign in with your email by clicking on the following link:\n\n${url.toString()}\n\nThanks!\n\nThe Basement of Stinkology Team`,
  });
}
