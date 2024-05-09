import groupController from "@controllers/groupController";
import { parseTokenFromHeaders, verifyToken } from "@jwt";
import log from "@utils/logger";
import RouterSendMessage from "@utils/routerSendMessage";
import express, { NextFunction, Request, Response } from "express";

function createGroupRouter() {
  const router = express.Router();

  router.get("/", getHanlder);
  router.get("/profile", getProfileHanlder);

  return router;
}

async function getHanlder(req: Request, res: Response, next: NextFunction) {
  const token = parseTokenFromHeaders(req.headers) as string;
  const groups = await groupController.getGroupsByUserToken(token);
  if (groups === null) return RouterSendMessage.error(res, "No user found");
  return RouterSendMessage.sendData(res, groups);
}

async function getProfileHanlder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = req.query.id as string;
  if (!id) return RouterSendMessage.error(res, "id is required");
  try {
    const profile = await groupController.getProfileByGroupId(id);
    return RouterSendMessage.sendData(res, profile);
  } catch (error) {
    log.error(error);
    return RouterSendMessage.INTERNAL_SERVER_ERROR(res);
  }
}

export default createGroupRouter;
