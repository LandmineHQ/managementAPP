import policyController from "@controllers/policyController";
import RouterSendMessage from "@utils/routerSendMessage";
import express, { NextFunction, Request, Response } from "express";

function createPolicyRouter() {
  const router = express.Router();

  router.get("/", getHanlder);
  router.post("/", postHanlder);

  return router;
}

async function postHanlder(req: Request, res: Response, next: NextFunction) {
  const data = req.body;
  if (!data) return RouterSendMessage.error(res, "data is required");
  const policy = await policyController.createPolicy(data);
  if (!policy) return RouterSendMessage.error(res, "创建失败");
  return RouterSendMessage.sendData(res, policy);
}

async function getHanlder(req: Request, res: Response, next: NextFunction) {
  const limit = req.query.limit as string;
  const offset = (req.query.offset as string) || "0";
  const id = req.query.id as string;
  if (id) {
    const data = await policyController.getPolicyById(id);
    if (!data) return RouterSendMessage.error(res, "policy not found");
    return RouterSendMessage.sendData(res, data);
  } else if (!limit) {
    // 没有限制数量则只查找最新的
    const data = await policyController.getLatestPolicy();
    if (!data) return RouterSendMessage.error(res, "policy not found");
    return RouterSendMessage.sendData(res, data);
  } else if (limit.toLowerCase() === "infinity") {
    const data = await policyController.getAllPolicies();
    if (!data) return RouterSendMessage.error(res, "policy not found");
    return RouterSendMessage.sendData(res, data);
  } else {
    if (isNaN(parseInt(limit)) || isNaN(parseInt(offset))) {
      return RouterSendMessage.error(res, "limit or offset is not a number");
    }
    const data = await policyController.getAllPoliciesWithLimit(
      parseInt(limit),
      parseInt(offset)
    );
    if (!data) return RouterSendMessage.error(res, "policy not found");
    return RouterSendMessage.sendData(res, data);
  }
}

export default createPolicyRouter;
