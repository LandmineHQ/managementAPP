import express from "express";
import { StatusCodes } from "http-status-codes";
import ROUTER_NAME from "./config";
import userRouter from "./users";
import authRouter from "./auth";
import debugRouter from "./debug";
import trainingRouter from "./training";
import monitorRouter from "./monitor";

function createRouter() {
  const router = express.Router();

  /* GET ROOT page. */
  router.get(`${ROUTER_NAME.ROOT}`, (req, res, next) => {
    res.status(StatusCodes.OK).send("县域工业企业数智化管理APP平台 API接口");
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
