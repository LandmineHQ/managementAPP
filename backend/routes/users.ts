import { NextFunction, Request, Response } from "express";
import express from "express";
import { StatusCodes } from "http-status-codes";

function createRouter() {
  const router = express.Router();

  /* GET users listing. */
  const requestHanlder = (req: Request, res: Response, next: NextFunction) => {
    res.status(StatusCodes.OK).send("respond with a resource");
  };

  router.get("/", requestHanlder);

  return router;
}

export default createRouter;
