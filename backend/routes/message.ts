import groupController from "@controllers/groupController";
import messageController from "@controllers/messageController";
import userController from "@controllers/userController";
import { parseTokenFromHeaders, verifyToken } from "@jwt";
import RouterSendMessage from "@utils/routerSendMessage";
import express, { Response, Request, NextFunction } from "express";

function createMessageRouter() {
  const router = express.Router();

  router.get("/", getHandler);
  router.get("/group", getGroupHandler);

  router.put("/read", putReadHandler);
  router.post("/", postHandler);

  return router;
}

async function getHandler(req: Request, res: Response, next: NextFunction) {
  const token = parseTokenFromHeaders(req.headers) as string;
  let day = req.query.day as string;
  if (!day) {
    day = "7";
  }
  const messages = await messageController.getMessagesByToken(token, day);
  return RouterSendMessage.sendData(res, messages);
}

async function getGroupHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = parseTokenFromHeaders(req.headers) as string;
  const messages = await messageController.getGroupsMessagesByToken(token);
  return RouterSendMessage.sendData(res, messages);
}

async function postHandler(req: Request, res: Response, next: NextFunction) {
  const token = parseTokenFromHeaders(req.headers) as string;
  const data = req.body;
  if (
    !data.type ||
    !data.content ||
    (!data.receiverId && !data.receiverGroupId)
  ) {
    return RouterSendMessage.error(res, "消息参数缺失");
  }
  const message = await messageController.sendMessage(token, data);
  if (!message) return RouterSendMessage.error(res, "发送失败");
  return RouterSendMessage.sendData(res, message);
}

async function putReadHandler(req: Request, res: Response, next: NextFunction) {
  const token = parseTokenFromHeaders(req.headers) as string;
  const id = req.body.senderId;
  if (!id) RouterSendMessage.error(res, "id参数缺失");
  await messageController.messagesSetReadByToken(token, id);
  return RouterSendMessage.OK(res);
}

export default createMessageRouter;
