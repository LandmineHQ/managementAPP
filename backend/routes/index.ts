import express from "express";
import { ROUTER_NAME } from "./config";
import packageJson from "@package.json";
import userRouter from "./users";
import authRouter from "./auth";
import debugRouter from "./debug";
import trainingRouter from "./training";
import monitorRouter from "./monitor";
import RouterSendMessage from "@utils/routerSendMessage";

function createRouter() {
  const router = express.Router();

  /* GET ROOT page. */
  router.get(`${ROUTER_NAME.ROOT}`, (req, res, next) => {
    RouterSendMessage.sendData(res, {
      isManagement: true,
      version: packageJson.version,
    });
  });

  router.use(`/${ROUTER_NAME.USER}`, userRouter());
  router.use(`/${ROUTER_NAME.AUTH}`, authRouter());
  router.use(`/${ROUTER_NAME.TRAINING}`, trainingRouter());
  router.use(`/${ROUTER_NAME.MONITOR}`, monitorRouter());

  if (process.env.NODE_ENV === "development") {
    router.use(`/${ROUTER_NAME.DEBUG}`, debugRouter());
  }

  return router;
}

export default createRouter;
