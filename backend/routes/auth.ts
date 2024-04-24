import express, { Request, Response, NextFunction } from "express";
import ROUTER_NAME from "./config";
import { StatusCodes } from "http-status-codes";

function createRouter() {
  const route = express.Router();

  route.post("/", requestHandler);

  return route;
}

function requestHandler(req: Request, res: Response, next: NextFunction) {
  res.sendStatus(StatusCodes.OK);
}

export default createRouter;
