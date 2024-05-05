import express from "express";
import { ROUTER_NAME } from "./config";
import packageJson from "@package.json";
import createUserRouter from "./users";
import createAuthRouter from "./auth";
import debugRouter from "./debug";
import createTrainingRouter from "./training";
import createMonitorRouter from "./monitor";
import RouterSendMessage from "@utils/routerSendMessage";
import createPolicyRouter from "./policy";
import createImageRouter from "./image";

function createRouter() {
  const router = express.Router();

  /* GET ROOT page. */
  router.get(`${ROUTER_NAME.ROOT}`, (req, res, next) => {
    RouterSendMessage.sendData(res, {
      isManagement: true,
      version: packageJson.version,
    });
  });

  router.use(`/${ROUTER_NAME.USER}`, createUserRouter());
  router.use(`/${ROUTER_NAME.AUTH}`, createAuthRouter());
  router.use(`/${ROUTER_NAME.TRAINING}`, createTrainingRouter());
  router.use(`/${ROUTER_NAME.MONITOR}`, createMonitorRouter());
  router.use(`/${ROUTER_NAME.POLICY}`, createPolicyRouter());
  router.use(`/${ROUTER_NAME.IMAGE}`, createImageRouter());

  if (process.env.NODE_ENV === "development") {
    router.use(`/${ROUTER_NAME.DEBUG}`, debugRouter());
  }

  return router;
}

export default createRouter;
