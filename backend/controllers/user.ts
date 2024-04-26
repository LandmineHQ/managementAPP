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

async function updateAvatar(token: string, newAvatar: string) {
  const user = await getByToken(token);
  if (user) {
    user.avatar = newAvatar;
    await user.save();
  }
  return user;
}

async function updateNickname(token: string, newNickname: string) {
  const user = await getByToken(token);
  if (user) {
    user.nickname = newNickname;
    await user.save();
  }
  return user;
}

async function updatePhone(token: string, newPhone: string) {
  const user = await getByToken(token);
  if (user) {
    user.phone = newPhone;
    await user.save();
  }
  return user;
}

async function updatePassword(token: string, newPassword: string) {
  const user = await getByToken(token);
  if (user) {
    user.password = newPassword;
    await user.save();
  }
}

export default {
  getByToken,
  register,
  updateAvatar,
  updateNickname,
  updatePhone,
  updatePassword,
};
