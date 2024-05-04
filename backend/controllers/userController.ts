import Socket from "@models/Socket";
import User from "@models/User";
import { Op } from "sequelize";
import socketController from "./socketController";

async function getByToken(token: string) {
  const user = await User.findOne({
    where: {
      token: token,
    },
  });
  return user;
}

async function updateSocketIdByToken(scoketId: string | null, token: string) {
  const user = await getByToken(token);
  let socket: Socket = null as never;
  if (user) {
    socketController.updateSocketIdByUser(user, scoketId);
  }
  return socket;
}

async function register(email: string, password: string, nickname?: string) {
  let user;
  if (!nickname) {
    user = await User.create({
      email,
      password,
    });
  } else {
    user = await User.create({
      email,
      password,
      nickname,
    });
  }
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
  return user;
}

async function updatePasswordByEmail(email: string, newPassword: string) {
  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (user) {
    user.password = newPassword;
    await user.save();
  }
  return user;
}

export default {
  getByToken,
  register,
  updateAvatar,
  updateNickname,
  updatePhone,
  updatePassword,
  updatePasswordByEmail,
  updateSocketIdByToken,
};
