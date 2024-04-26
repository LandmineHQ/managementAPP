import User from "@models/User";
import jwt from "jsonwebtoken";
import config from "config";

async function getToken(email: string, password: string) {
  const user = await User.findOne({
    where: {
      email,
      password,
    },
  });
  if (!user) {
    return { error: "用户不存在" };
  }
  let token = user.token;
  if (!token) {
    const secretKey = config.get<string>("jwtConfig.secret");
    const expiresIn = config.get<string>("jwtConfig.expiresIn");
    token = jwt.sign({ email, password }, secretKey, { expiresIn });
    user.token = token;
    user.save();
  }

  return { token };
}

export { getToken };
