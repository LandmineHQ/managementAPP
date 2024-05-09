import express from "express";
import userController from "@controllers/userController";
import RouterSendMessage from "@utils/routerSendMessage";
import Person from "@models/Person";
import { parseTokenFromHeaders } from "@jwt";

function createTrainingRouter() {
  const router = express.Router();

  router.get("/", getRootHandler);

  return router;
}

async function getRootHandler(req: express.Request, res: express.Response) {
  const token = parseTokenFromHeaders(req.headers) as string;
  const user = await userController.getByToken(token);
  if (!user) {
    return RouterSendMessage.error(res, "user not found");
  }
  // person
  // @ts-expect-error
  const person = (await user.getPerson()) as Person;
  if (!person) {
    return RouterSendMessage.error(res, "person not found");
  }
  // @ts-expect-error
  const trainings = await person.getTrainings();
  return RouterSendMessage.sendData(res, trainings);
}

export default createTrainingRouter;
