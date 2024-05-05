import express from "express";
import debugController from "@controllers/debugController";
import socketController from "@controllers/socketController";
import RouterSendMessage from "@utils/routerSendMessage";

function createRouter() {
  const router = express.Router();

  router.get("/database", async (req, res, next) => {
    await debugController.rebuildDatabase();
    return RouterSendMessage.sendData(res, "数据库rebuild done");
  });

  router.get("/seeds", async (req, res, next) => {
    await debugController.testSeeds();
    return RouterSendMessage.sendData(res, "测试 seeds 成功！");
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
