import express from "express";
import { StatusCodes } from "http-status-codes";
import usersRouter from "./users";
import ROUTER_NAME from "./config";

function createRouter() {
  const router = express.Router();

  /* GET ROOT page. */
  router.get(`${ROUTER_NAME.ROOT}`, (req, res, next) => {
    res.status(StatusCodes.OK).send("县域工业企业数智化管理APP平台 API接口");
  });

  router.use(`/${ROUTER_NAME.USER}`, usersRouter());

  return router;
}

export default createRouter;
export { ROUTER_NAME };
