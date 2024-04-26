import jwt from "jsonwebtoken";
import config from "config";

const secret = config.get<string>("jwtConfig.secret");

function validateToken(token: string) {
  let isValidated: boolean = false;

  try {
    // 检测是否合法
    jwt.verify(token, secret);
    isValidated = true;
  } catch (error) {
    isValidated = false;
  }

  return isValidated;
}

export { validateToken };
