import { NextFunction, Request, Response } from "express";
import express from "express";
import { StatusCodes } from "http-status-codes";
import ROUTER_NAME from "./config";

enum PERMISSIONS {
  USER,
  LAW,
  OPREATION,
}

function createRouter() {
  const router = express.Router();

  router.get("/", requestHanlder);

  return router;
}

/* GET users listing. */
const requestHanlder = (req: Request, res: Response, next: NextFunction) => {
  res.status(StatusCodes.OK).send(ROUTER_NAME.USER);
};

export default createRouter;
export { PERMISSIONS };
