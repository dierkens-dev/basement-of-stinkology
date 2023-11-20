import mailer from "nodemailer";
import smtp from "nodemailer-smtp-transport";

export const transport = mailer.createTransport(
  smtp({
    host: "in-v3.mailjet.com",
    port: 2525,
    secure: true,
    auth: {
      user: process.env.BOS_MAILJET_API_KEY,
      pass: process.env.BOS_MAILJET_API_SECRET,
    },
  }),
);
