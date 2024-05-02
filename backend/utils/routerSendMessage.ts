import { Response } from "express";
import { StatusCodes } from "http-status-codes";

class RouterSendMessage {
  static error(res: Response, message: string) {
    res.send({ error: message });
  }

  static sendData(res: Response, data: any) {
    res.send(data);
  }

  static sendMessage(res: Response, message: string) {
    this.sendData(res, { message });
  }

  static UNAUTHORIZED(res: Response) {
    res.sendStatus(StatusCodes.UNAUTHORIZED);
  }

  static OK(res: Response) {
    res.sendStatus(StatusCodes.OK);
  }

  static BAD_REQUEST(res: Response) {
    res.sendStatus(StatusCodes.BAD_REQUEST);
  }
  static NOT_FOUND(res: Response) {
    res.sendStatus(StatusCodes.NOT_FOUND);
  }

  static NO_CONTENT(res: Response) {
    res.sendStatus(StatusCodes.NO_CONTENT);
  }

  static INTERNAL_SERVER_ERROR(res: Response) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

export default RouterSendMessage;
