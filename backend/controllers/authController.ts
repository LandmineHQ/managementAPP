import { MailOptions } from "nodemailer/lib/json-transport";
import jwt from "jsonwebtoken";
import config from "config";
import bcrypt from "bcrypt";

import User from "@models/User";
import sendEmail from "@mailer";
import VerificationCode from "@models/VerificationCode";

async function getToken(
  email: string,
  password: string,
  freshToken: boolean = false
) {
  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (!user) {
    return { error: "用户不存在" };
  }
  if (process.env.NODE_ENV === "production") {
    // 生产模式密码hash比较
    if (bcrypt.compareSync(user.password, password) === false) {
      return { error: "密码错误" };
    }
  } else {
    // 开发模式密码比较
    if (user.password !== password) {
      return { error: "密码错误" };
    }
  }
  let token;
  if (freshToken === false) {
    token = user.token;
  }
  if (!token) {
    const secretKey = config.get<string>("jwtConfig.secret");
    const expiresIn = config.get<string>("jwtConfig.expiresIn");
    const date = new Date().getTime();
    token = jwt.sign({ date, email, password }, secretKey, { expiresIn });
    user.token = token;
    user.last_login = new Date();
    user.save();
  }

  return { token };
}

async function getMailCode(email: string) {
  // 检索数据库是否已拥有验证码
  let verificationCode = await VerificationCode.findOne({
    where: {
      email: email,
    },
  });
  let code;
  if (!verificationCode) {
    // 得到六位随机数
    code = Math.floor(100000 + Math.random() * 900000).toString();

    verificationCode = await VerificationCode.create({
      email,
      code,
    });
  } else {
    code = verificationCode.code;
  }

  const mailOptions: MailOptions = {
    from: config.get<string>("mailerConfig.auth.user"),
    to: email,
    subject: "县域工业企业数智化管理平台验证码",
    text: `验证码：${code}，如非本人操作，请忽略`,
  };

  sendEmail(mailOptions);
}

async function validateMailCode(email: string, code: string) {
  const verificationCode = await VerificationCode.findOne({
    where: {
      email,
      code,
    },
  });
  if (!verificationCode) {
    return false;
  } else {
    verificationCode.destroy();
    return true;
  }
}

export default { getToken, getMailCode, validateMailCode };
