import express, { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { getToken } from "@controllers/auth";
import log from "@utils/logger";

function createRouter() {
  const route = express.Router();

  route.post("/", requestHandler);

  return route;
}

async function requestHandler(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(StatusCodes.BAD_REQUEST).send("email or password is required");
    return;
  }
  const token = await getToken(email, password);
  log.info(token);
  res.send(token);
}

export default createRouter;
