import express from "express";
import debugController from "@controllers/debugController";
import seeds from "@database/seeds";
import { StatusCodes } from "http-status-codes";
import socketController from "@controllers/socketController";
import RouterSendMessage from "@utils/routerSendMessage";

function createRouter() {
  const router = express.Router();

  router.get("/database/rebuild", async () => {
    await debugController.rebuildDatabase();
  });

  router.get("/database/seeds", async (req, res, next) => {
    await seeds();
    return RouterSendMessage.OK(res);
  });

  router.get("/", async (req, res, next) => {
    return RouterSendMessage.OK(res);
  });

  router.get("/push", async (req, res, next) => {
    const msg = req.query.msg as string;
    if (!msg) return RouterSendMessage.error(res, "没有输入msg参数");
    socketController.pushNotificationGlobal(msg);
    return RouterSendMessage.OK(res);
  });

  return router;
}

export default createRouter;
