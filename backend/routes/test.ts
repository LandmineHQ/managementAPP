import express, { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { Sequelize } from "sequelize";

function createRouter() {
  const router = express.Router();

  router.get("/", requestHanlder);

  return router;
}

function requestHanlder(req: Request, res: Response) {}

export default createRouter;
