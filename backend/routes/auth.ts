import express, { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import authController from "@controllers/auth";
import userController from "@controllers/user";
import log from "@utils/logger";
import User from "@models/User";
import RouterSendMessage from "@utils/routerSendMessage";

function createRouter() {
  const router = express.Router();

  router.post("/", postHandler);
  router.post("/code/register", postCodeRegisterHanlder);
  router.post("/forget/password", postForgotPasswordHandler);
  router.get("/code", getCodeHandler);

  return router;
}

async function postHandler(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(StatusCodes.BAD_REQUEST).send("email or password is required");
    return;
  }
  const token = await authController.getToken(email, password, true);
  log.info(token);
  res.send(token);
}

async function postCodeRegisterHanlder(req: Request, res: Response) {
  const code = req.body.code;
  const email = req.body.email;
  const nickname = req.body.nickname;
  const password = req.body.password;

  if (!req.body.code || !email) {
    return RouterSendMessage.error(res, "验证码或邮箱未输入");
  }

  // 检测邮箱是否已注册
  const user = await User.findOne({
    where: {
      email: email,
    },
  });
  if (user) {
    return RouterSendMessage.error(res, "该邮箱已注册");
  }

  // 验证验证码
  const isOk = await authController.validateMailCode(email, code);
  if (isOk) {
    userController.register(email, password, nickname);
    return RouterSendMessage.sendMessage(res, "注册成功！");
  } else {
    return RouterSendMessage.error(res, "验证码不正确");
  }
}

async function postForgotPasswordHandler(req: Request, res: Response) {
  if (!req.body.email || !req.body.code || !req.body.password) {
    return RouterSendMessage.error(res, "未输入完整");
  } else if (req.body.code && req.body.email && req.body.password) {
    // 验证验证码
    const isOk = await authController.validateMailCode(
      req.body.email,
      req.body.code
    );
    if (isOk) {
      userController.updatePasswordByEmail(req.body.email, req.body.password);
      return RouterSendMessage.sendMessage(res, "重置密码成功");
    } else {
      return RouterSendMessage.error(res, "验证码不正确");
    }
  }
}

async function getCodeHandler(req: Request, res: Response) {
  const email = req.query.email as string;
  if (!email) {
    return RouterSendMessage.error(res, "邮箱不能为空！");
  } else {
    // 发送验证码
    authController
      .getMailCode(email)
      .then(() => {
        return RouterSendMessage.sendMessage(res, "验证码已发送");
      })
      .catch((error) => {
        log.error(error);
        return RouterSendMessage.error(res, "验证码发送失败");
      });
  }
}

export default createRouter;
