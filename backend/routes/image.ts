import imageController from "@controllers/imageController";
import RouterSendMessage from "@utils/routerSendMessage";
import expresss, { NextFunction, Request, Response } from "express";

function createImageRouter() {
  const router = expresss.Router();

  router.get(`/`, getHandler);
  router.get(`/counts`, getCountsHandler);
  router.get(`/user`, getUserHandler);

  return router;
}

async function getUserHandler(req: Request, res: Response, next: NextFunction) {
  const id = req.query.id as string;
  if (!id) return RouterSendMessage.error(res, "缺少用户id");
  const avatar = await imageController.getUserAvatarById(id);
  return RouterSendMessage.sendData(res, avatar.src);
}

async function getHandler(req: Request, res: Response, next: NextFunction) {
  const id = req.query.id as string;
  if (!id) return RouterSendMessage.error(res, "缺少资源id");
  const image = await imageController.getImageById(id);
  if (!image) return RouterSendMessage.error(res, "资源不存在");
  return RouterSendMessage.sendData(res, image.src);
}

async function getCountsHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const counts = await imageController.getImagesCounts();
  return RouterSendMessage.sendData(res, { counts });
}

export default createImageRouter;
