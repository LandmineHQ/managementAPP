import groupController from "@controllers/groupController";
import imageController from "@controllers/imageController";
import messageController from "@controllers/messageController";
import personControllers from "@controllers/personControllers";
import policyController from "@controllers/policyController";
import trainingController from "@controllers/trainingController";
import userController from "@controllers/userController";
import RouterSendMessage from "@utils/routerSendMessage";
import express from "express";

function createDataRouter() {
  const router = express.Router();

  router.get(`/`, getHandler);
  return router;
}

async function getHandler(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const tableName = req.query.table;
  if (!tableName) return RouterSendMessage.error(res, "table is required");

  let data: any;
  switch (tableName.toString().toLowerCase()) {
    case "person":
      data = await personControllers.getAllPeople();
      break;
    case "message":
      data = await messageController.getAllMessages();
      break;
    case "user":
      data = await userController.getAllUsers();
      break;
    case "training":
      data = await trainingController.getAllTrainings();
      break;
    case "group":
      data = await groupController.getAllGroups();
      break;
    case "image":
      data = await imageController.getAllImages();
      break;
    case "policy":
      data = await policyController.getAllPolicies();
      break;
    case "usergroup":
      data = await groupController.getAllGroupMenbers();
      break;
  }

  if (data) return RouterSendMessage.sendData(res, data);
  return RouterSendMessage.error(res, "table not found");
}

export default createDataRouter;
