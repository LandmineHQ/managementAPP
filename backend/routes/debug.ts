import express from "express";
import debugController from "@controllers/debugController";
import socketController from "@controllers/socketController";
import RouterSendMessage from "@utils/routerSendMessage";
import groupController from "@controllers/groupController";

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
    return RouterSendMessage.sendMessage(res, `推送消息：${msg} 成功！`);
  });

  router.get("/group", async (req, res, next) => {
    const id = req.query.id as string;
    if (id) {
      const group = await groupController.getGroupById(id);
      if (!group) return RouterSendMessage.error(res, "没有找到该群组");
      return RouterSendMessage.sendData(res, group);
    } else {
      const groups = await groupController.getAllGroups();
      if (!groups) return RouterSendMessage.error(res, "没有任何群组");
      return RouterSendMessage.sendData(res, groups);
    }
  });

  router.get("/group/menber", async (req, res, next) => {
    const id = req.query.id as string;
    if (id) {
      const menbers = await groupController.getGroupMenbersById(id);
      if (!menbers) return RouterSendMessage.error(res, "没有找到该群组");
      return RouterSendMessage.sendData(res, menbers);
    } else {
      const data = await groupController.getAllGroupMenbers();
      return RouterSendMessage.sendData(res, data);
    }
  });

  return router;
}

export default createRouter;
