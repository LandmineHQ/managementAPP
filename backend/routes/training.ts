import express from "express";
import userController from "@controllers/user";
import RouterSendMessage from "@utils/routerSendMessage";

function createRouter() {
  const router = express.Router();

  router.get("/", getRootHandler);

  return router;
}

async function getRootHandler(req: express.Request, res: express.Response) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return RouterSendMessage.error(res, "token is required");
  }
  const user = await userController.getByToken(token);
  if (!user) {
    return RouterSendMessage.error(res, "user not found");
  }
  // person
  const person = await user.getPerson();
  if (!person) {
    return RouterSendMessage.error(res, "person not found");
  }
  const trainings = await person.getTrainings();
  return RouterSendMessage.sendData(res, trainings);
}

export default createRouter;
