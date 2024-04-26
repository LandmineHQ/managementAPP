import { Express } from "express";
import express from "express";
import responseHeader from "./responseHeader";
import logRequest from "./logRequest";
import log from "@utils/logger";
import unResovled from "./unResolved";

function initMiddleware(app: Express) {
  app.use(express.json());
  app.use(logRequest);
  app.use(responseHeader);
  log.info("中间件初始化完毕");
}

function inifMiddleareAfterMountedRouter(app: Express) {
  app.use(unResovled);
}

export default initMiddleware;
export { inifMiddleareAfterMountedRouter };
