import { NextFunction, Request, Response } from "express";
import express from "express";
import userController from "@controllers/userController";
import RouterSendMessage from "@utils/routerSendMessage";
import { parseTokenFromHeaders, verifyToken } from "@jwt";
import log from "@utils/logger";

function createUserRouter() {
  const router = express.Router();

  router.get("/", getHanlder);
  router.put("/", putHanlder);
  router.get("/profile", getPublicHanlder);

  return router;
}

async function getPublicHanlder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = req.query.id as string;
  if (!id) return RouterSendMessage.error(res, "id is required");
  try {
    const data = await userController.getPublic(id);
    return RouterSendMessage.sendData(res, data);
  } catch (error) {
    if (typeof error === "string") {
      return RouterSendMessage.error(res, error);
    } else {
      log.error(JSON.stringify(error, null, 2));
      return RouterSendMessage.INTERNAL_SERVER_ERROR(res);
    }
  }
}

async function getHanlder(req: Request, res: Response) {
  const token = parseTokenFromHeaders(req.headers) as string;
  const user = await userController.getByToken(token);
  if (!user) {
    return RouterSendMessage.error(res, "user not found");
  }
  return RouterSendMessage.sendData(res, user);
}

async function putHanlder(req: Request, res: Response, next: NextFunction) {
  const token = parseTokenFromHeaders(req.headers) as string;
  const params = req.body;

  if (params.avatar) {
    await userController.updateAvatar(token, params.avatar);
  }
  if (params.nickname) {
    await userController.updateNickname(token, params.nickname);
  }
  if (params.phone) {
    await userController.updatePhone(token, params.phone);
  }
  if (params.password) {
    await userController.updatePassword(token, params.password);
  }

  const user = await userController.getByToken(token);
  RouterSendMessage.sendData(res, user);
}

export default createUserRouter;
