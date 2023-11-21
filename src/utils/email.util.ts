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
    subject: "Verify your email for Basement of Stinkology",
    text: `Hello!\n\nPlease verify your email by clicking on the following link:\n\n${url.toString()}\n\nThanks!\n\nThe Basement of Stinkology Team`,
  });
}
