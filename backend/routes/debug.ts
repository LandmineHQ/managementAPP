import express from "express";
import debugController from "@controllers/debug";
import seeds from "@database/seeds";
import { StatusCodes } from "http-status-codes";

function createRouter() {
  const router = express.Router();

  router.get("/database/rebuild", async () => {
    await debugController.rebuildDatabase();
  });

  router.get("/database/seeds", async (req, res, next) => {
    await seeds();

    res.sendStatus(StatusCodes.OK);
  });

  router.get("/", async (req, res, next) => {
    res.sendStatus(StatusCodes.OK);
  });

  return router;
}

export default createRouter;
