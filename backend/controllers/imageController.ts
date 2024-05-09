import Image from "@models/Image";
import User from "@models/User";

async function getImageById(id: string) {
  const image = await Image.findByPk(id);
  return image;
}

async function getImagesCounts() {
  const count = await Image.count();
  return count;
}

async function getUserAvatarById(id: string) {
  const user = await User.findByPk(id);
  if (!user) throw new Error(`user(id:${id}) not found`);
  // @ts-expect-error
  const avatar = await user.getAvatar();
  if (!avatar) throw new Error(`user(id:${id}) avatar not found`);
  return avatar;
}

export default {
  getImageById,
  getImagesCounts,
  getUserAvatarById,
};
