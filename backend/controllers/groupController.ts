import Group from "@models/Group";
import User from "@models/User";

async function getAllGroups() {
  const groups = await Group.findAll();
  return groups;
}

async function getGroupById(id: string) {
  const group = await Group.findByPk(id);
  return group;
}

async function getGroupMenbersById(id: string) {
  const group = await getGroupById(id);
  if (!group) return group;
  // @ts-expect-error
  const users = await group.getUsers();
  return users;
}

async function getAllGroupMenbers() {
  const data: Array<any> = [];
  const groups = await getAllGroups();
  if (!groups) return groups;
  for (let group of groups) {
    // @ts-expect-error
    const users = await group.getUsers();
    data.push({
      id: group.id,
      menbers: users,
    });
  }

  return data;
}

/* 得到用户加入的group */
async function getGroupsByUserToken(token: string) {
  const user = await User.findOne({
    where: {
      token: token,
    },
  });
  if (!user) return null;
  // @ts-expect-error
  const groups = user.getGroups();
  return groups;
}

export default {
  getAllGroups,
  getGroupById,
  getGroupMenbersById,
  getAllGroupMenbers,
  getGroupsByUserToken,
};
