import express from "express";
import { StatusCodes } from "http-status-codes";
import usersRouter from "./users";
const router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  res.status(StatusCodes.OK).send("县域工业企业数智化管理APP平台 API接口");
});

router.use("/user", usersRouter);

export default router;
