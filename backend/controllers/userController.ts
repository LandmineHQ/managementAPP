import bcrypt from "bcrypt";

import User, { USER_PERMISSIONS } from "@models/User";
import Image from "@models/Image";
import config from "config";

async function getByToken(token: string) {
  const user = await User.findOne({
    where: {
      token: token,
    },
    include: {
      model: Image,
      as: "avatar",
    },
  });
  return user;
}

async function register(email: string, password: string, nickname?: string) {
  if (process.env.NODE_ENV === "production") {
    // 生产模式密码hash salt
    const saltRounds = config.get<string>("bcryptConfig.saltRounds");
    password = bcrypt.hashSync(password, saltRounds);
  }
  let info = { email, password, permission: USER_PERMISSIONS.USER };
  if (!nickname) Object.defineProperty(info, "nickname", { value: nickname });
  const user = await User.create(info);
  return user;
}

async function updateAvatar(token: string, newAvatar: string) {
  const user = await getByToken(token);
  if (user) {
    // @ts-expect-error
    const avatar = (await user.getAvatar()) as Image;
    if (!avatar) {
      // @ts-expect-error
      await user.createAvatar({ src: newAvatar });
    } else {
      avatar.src = newAvatar;
      await avatar.save();
    }
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

async function getPublic(id: string) {
  const user = await User.findByPk(id, {
    include: {
      model: Image,
      as: "avatar",
    },
  });
  if (!user) throw new Error(`user(id:${id}) not found`);
  const publicProfile = {
    id: user.id,
    email: user.email,
    nickname: user.nickname,
    permission: user.permission,
    // @ts-expect-error
    avatar: user.avatar,
  };
  return publicProfile;
}

export default {
  getByToken,
  register,
  updateAvatar,
  updateNickname,
  updatePhone,
  updatePassword,
  updatePasswordByEmail,
  getPublic,
};
