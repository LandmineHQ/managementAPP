import Training from "@models/Training";
import express from "express";

function createRouter() {
  const router = express.Router();

  router.get("/", getRootHandler);

  return router;
}

function getRootHandler(req: express.Request, res: express.Response) {
  const training = Training.findAll({
    where: {},
  });
}

export default createRouter;
