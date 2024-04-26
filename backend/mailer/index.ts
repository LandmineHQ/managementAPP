import nodemailer from "nodemailer";
import config from "config";
import { MailOptions } from "nodemailer/lib/json-transport";
import log from "@utils/logger";

const transporter = nodemailer.createTransport({
  host: config.get("mailerConfig.host"),
  port: config.get("mailerConfig.port"),
  secure: config.get("mailerConfig.secure"),
  auth: {
    user: config.get("mailerConfig.auth.user"),
    pass: config.get("mailerConfig.auth.pass"),
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function sendEmail(mailOptions: MailOptions) {
  // mailOptions = {
  //   from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
  //   to: "bar@example.com, baz@example.com", // list of receivers
  //   subject: "Hello ✔", // Subject line
  //   text: "Hello world?", // plain text body
  //   html: "<b>Hello world?</b>", // html body
  // };

  // send mail with defined transport object
  const info = await transporter.sendMail(mailOptions);

  log.info(`Message sent: ${info.messageId}`);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

export default sendEmail;
