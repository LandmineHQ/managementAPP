import jwt from "jsonwebtoken";
import config from "config";
import { Request } from "express";

const secret = config.get<string>("jwtConfig.secret");

function parseTokenFromHeaders(headers: Request["headers"]) {
  const arrayAuthorization = headers.authorization?.split(" ");
  const scheme = arrayAuthorization?.[0]; // 获取关键字，例如 "Bearer"
  const token = arrayAuthorization?.[1]; // 获取令牌

  // not Bearer
  if (scheme?.toLowerCase() !== "bearer") {
    return undefined;
  }

  return token;
}

function verifyToken(token: string | undefined): boolean {
  let isValidated: boolean = false;

  if (token === undefined || token === "") {
    return isValidated;
  }

  try {
    // 检测是否合法
    jwt.verify(token, secret);
    isValidated = true;
  } catch (error) {
    isValidated = false;
  }

  return isValidated;
}

export { verifyToken, parseTokenFromHeaders };
