import nodemailer from "nodemailer";
import config from "config";

const transporter = nodemailer.createTransport({
  host: config.get("mailerConfig.host"),
});
