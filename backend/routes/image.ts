import imageController from "@controllers/imageController";
import RouterSendMessage from "@utils/routerSendMessage";
import expresss, { NextFunction, Request, Response } from "express";

function createImageRouter() {
  const router = expresss.Router();

  router.get(`/`, getHandler);

  return router;
}

async function getHandler(req: Request, res: Response, next: NextFunction) {
  const id = req.query.id as string;
  if (!id) return RouterSendMessage.error(res, "缺少资源id");
  const image = await imageController.getImageById(id);
  if (!image) return RouterSendMessage.error(res, "资源不存在");
  return RouterSendMessage.sendData(res, image.src);
}

export default createImageRouter;
