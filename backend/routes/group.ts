import groupController from "@controllers/groupController";
import { verifyToken } from "@jwt";
import RouterSendMessage from "@utils/routerSendMessage";
import express, { NextFunction, Request, Response } from "express";

function createGroupRouter() {
  const router = express.Router();

  router.get("/", getHanlder);

  return router;
}

async function getHanlder(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return RouterSendMessage.UNAUTHORIZED(res);
  if (verifyToken(token) === false) {
    return RouterSendMessage.error(res, "token verify error");
  }
  const groups = await groupController.getGroupsByUserToken(token);
  if (!groups) return RouterSendMessage.error(res, "user has none group");
  return RouterSendMessage.sendData(res, groups);
}

export default createGroupRouter;
