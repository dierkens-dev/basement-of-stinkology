import mailer from "nodemailer";
import smtp from "nodemailer-smtp-transport";

export const transport = mailer.createTransport(
  smtp({
    host: "in.mailjet.com",
    port: 2525,
    auth: {
      user: process.env.BOS_MAILJET_API_KEY,
      pass: process.env.BOS_MAILJET_API_SECRET,
    },
  }),
);
