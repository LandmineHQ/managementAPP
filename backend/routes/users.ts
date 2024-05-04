import { NextFunction, Request, Response } from "express";
import express from "express";
import userController from "@controllers/userController";
import RouterSendMessage from "@utils/routerSendMessage";

enum PERMISSIONS {
  USER,
  LAW,
  OPREATION,
}

function createRouter() {
  const router = express.Router();

  router.get("/", getHanlder);
  router.put("/", putHanlder);

  return router;
}

async function getHanlder(req: Request, res: Response) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return RouterSendMessage.UNAUTHORIZED(res);
  }
  const user = await userController.getByToken(token);
  res.send(user);
}

async function putHanlder(req: Request, res: Response) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return RouterSendMessage.UNAUTHORIZED(res);
  }
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

export default createRouter;
export { PERMISSIONS };
