import User from "@models/User";
import { Op } from "sequelize";

async function getByToken(token: string) {
  const user = await User.findOne({
    where: {
      token: token,
    },
  });
  return user;
}

async function register(email: string, password: string) {
  const user = await User.create({
    email,
    password,
  });
  return user;
}

export default { getByToken, register };
