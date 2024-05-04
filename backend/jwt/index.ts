import jwt from "jsonwebtoken";
import config from "config";

const secret = config.get<string>("jwtConfig.secret");

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

export { verifyToken as validateToken, verifyToken };
