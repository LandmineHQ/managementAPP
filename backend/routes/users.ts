import { NextFunction, Request, Response } from "express";
import express from "express";
import User from "@controllers/user";
import { StatusCodes } from "http-status-codes";

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
const requestHanlder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.sendStatus(StatusCodes.UNAUTHORIZED);
    return;
  }
  const user = await User.getByToken(token);
  res.send(user);
};

export default createRouter;
export { PERMISSIONS };
