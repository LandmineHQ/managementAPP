import express, { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import authController from "@controllers/auth";
import userController from "@controllers/user";
import log from "@utils/logger";
import User from "@models/User";

function createRouter() {
  const router = express.Router();

  router.post("/", requestHandler);
  router.post("/code", postCodeHanlder);
  router.post("/forget/password", forgotPasswordHandler);
  router.post("/getCode", getCodeHandler);

  return router;
}

async function requestHandler(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(StatusCodes.BAD_REQUEST).send("email or password is required");
    return;
  }
  const token = await authController.getToken(email, password, true);
  log.info(token);
  res.send(token);
}

async function postCodeHanlder(req: Request, res: Response) {
  if (!req.body.code && !req.body.email) {
    res.sendStatus(StatusCodes.BAD_REQUEST);
    return;
  } else if (!req.body.code && req.body.email) {
    // 检测邮箱是否已注册
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (user) {
      res.send({ error: "邮箱已注册" });
      return;
    }
    // 发送验证码
    authController
      .getMailCode(req.body.email)
      .then(() => {
        return res.sendStatus(StatusCodes.OK);
      })
      .catch((error) => {
        log.error(error);
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
      });
  } else if (req.body.code && req.body.email) {
    // 验证验证码
    const isOk = await authController.validateMailCode(
      req.body.email,
      req.body.code
    );
    if (isOk) {
      userController.register(req.body.email, req.body.password);
      res.send({ meessage: "注册成功！" });
    } else {
      res.send({ error: "验证码不正确" });
    }
  }
}

async function forgotPasswordHandler(req: Request, res: Response) {
  if (!req.body.email || !req.body.code || !req.body.password) {
    res.send({ error: "未输入完整" });
    return;
  } else if (req.body.code && req.body.email && req.body.password) {
    // 验证验证码
    const isOk = await authController.validateMailCode(
      req.body.email,
      req.body.code
    );
    if (isOk) {
      userController.updatePasswordByEmail(req.body.email, req.body.password);
      res.send({ meessage: "重置密码成功" });
    } else {
      res.send({ error: "验证码错误" });
    }
  }
}

async function getCodeHandler(req: Request, res: Response) {
  if (!req.body.email) {
    res.send({ error: "邮箱不能为空" });
    return;
  } else {
    // 发送验证码
    authController
      .getMailCode(req.body.email)
      .then(() => {
        return res.send({ message: "验证码已发送" });
      })
      .catch((error) => {
        log.error(error);
        res.send({ error: "验证码发送失败" });
      });
  }
}

export default createRouter;
