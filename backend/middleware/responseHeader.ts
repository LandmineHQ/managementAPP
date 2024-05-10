import { ROUTER_TOKENLESS } from "@routes/config";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { parseTokenFromHeaders, verifyToken } from "@jwt";
import RouterSendMessage from "@utils/routerSendMessage";

function responseHeader(req: Request, res: Response, next: NextFunction) {
  const { origin, referer } = req.headers;

  let allowOrigin: string | string[] | undefined;
  // 如果是开发模式，则默认允许全部跨域，否则只能允许origin
  if (process.env.NODE_ENV === "development") {
    allowOrigin = origin || referer;
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

  if (verifyRouterTokenLess(req.path) === false) {
    /* 路由需要鉴权 */
    // 没有token
    if (!req.headers.authorization) {
      return RouterSendMessage.UNAUTHORIZED(res);
    }

    const token = parseTokenFromHeaders(req.headers) as string;
    if (verifyToken(token) === false) {
      return RouterSendMessage.UNAUTHORIZED(res);
    }
  }

  next();
}

export default responseHeader;

/** 验证路由是否可以免token通过 */
function verifyRouterTokenLess(path: string) {
  let isValidated: boolean = false;
  for (let route of ROUTER_TOKENLESS) {
    if (path === `/${route}`) {
      isValidated = true;
      break;
    }
  }
  return isValidated;
}
