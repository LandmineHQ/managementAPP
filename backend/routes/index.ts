import express from "express";
import { StatusCodes } from "http-status-codes";
import ROUTER_NAME from "./config";
import userRouter from "./users";
import authRouter from "./auth";

function createRouter() {
  const router = express.Router();

  /* GET ROOT page. */
  router.get(`${ROUTER_NAME.ROOT}`, (req, res, next) => {
    res.status(StatusCodes.OK).send("县域工业企业数智化管理APP平台 API接口");
  });

  router.use(`/${ROUTER_NAME.USER}`, userRouter());
  router.use(`/${ROUTER_NAME.AUTH}`, authRouter());

  return router;
}

export default createRouter;
