import log from "@utils/logger";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

function unResolved(req: Request, res: Response, next: NextFunction) {
  log.warn("unResolved Router: " + req.path);
  res.redirect(StatusCodes.PERMANENT_REDIRECT, "/");
}

export default unResolved;
