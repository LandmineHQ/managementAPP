import RouterSendMessage from "@utils/routerSendMessage";
import express, { Request, Response, NextFunction } from "express";
import monitorController from "@controllers/monitor";

function createRouter() {
  const router = express.Router();

  router.get("/system", getSystemHandler);
  router.get("/devices", getDevicesHandler);

  return router;
}

function getSystemHandler(req: Request, res: Response, next: NextFunction) {
  monitorController.getSystemInfo((data) => {
    RouterSendMessage.success(res, data);
  });
}

function getDevicesHandler(req: Request, res: Response, next: NextFunction) {
  monitorController.getDevicesInfo((data) => {
    RouterSendMessage.success(res, data);
  });
}

export default createRouter;
