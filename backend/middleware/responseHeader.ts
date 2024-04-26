import ROUTER_NAME, { ROUTER_TOKENLESS } from "@routes/config";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import config from "config";
import log from "@utils/logger";
import { validateToken } from "@jwt";

function responseHeader(req: Request, res: Response, next: NextFunction) {
  const { origin, Origin, referer, Referer } = req.headers;

  let allowOrigin: string | string[] | undefined;
  // 如果是开发模式，则默认允许全部跨域，否则只能允许origin
  if (process.env.NODE_ENV === "development") {
    allowOrigin = origin || Origin || referer || Referer;
  }

  // 允许请求源
  res.header("Access-Control-Allow-Origin", allowOrigin);
  // 允许头部字段，确保包含Authorization
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  // 允许公开的头部字段
  res.header("Access-Control-Expose-Headers", "Content-Disposition");
  // 允许的请求方式
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  // 允许携带cookie
  res.header("Access-Control-Allow-Credentials", "true");

  // 预检返回204
  if (req.method == "OPTIONS") {
    res.sendStatus(StatusCodes.NO_CONTENT);
    return;
  }

  if (validateRouter(req.path) === false) {
    /* 路由需要鉴权 */
    // 没有token
    if (!req.headers.authorization) {
      res.sendStatus(StatusCodes.UNAUTHORIZED);
      return;
    }

    const token = req.headers.authorization.split(" ")[1];
    if (validateToken(token) === false) {
      res.sendStatus(StatusCodes.UNAUTHORIZED);
      return;
    }
  }

  next();
}

export default responseHeader;

/** 验证路由是否可以免token通过 */
function validateRouter(path: string) {
  let isValidated: boolean = false;
  for (let route of ROUTER_TOKENLESS) {
    if (path.includes(route)) {
      isValidated = true;
      break;
    }
  }
  return isValidated;
}
