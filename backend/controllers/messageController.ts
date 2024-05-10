import Group from "@models/Group";
import Message from "@models/Message";
import User from "@models/User";
import dayjs from "dayjs";
import { Op } from "sequelize";

async function getMessagesByToken(token: string, dayAgo: string) {
  const user = await User.findOne({
    where: {
      token: token,
    },
  });
  if (!user) return null;
  const numberDay = parseInt(dayAgo);
  const gteDate = dayjs().subtract(numberDay, "days").toDate();
  // @ts-expect-error
  const receivedMessages = (await user.getReceivedMessages()) as Message[];
  // @ts-expect-error
  const sentMessages = (await user.getSentMessages()) as Message[];
  return {
    receivedMessages,
    sentMessages,
  };
}

async function sendMessage(
  token: string,
  data: {
    type: string;
    content: string;
    receiverId: number;
  }
) {
  const user = User.findOne({
    where: {
      token: token,
    },
  });
  if (!user) return null;
  debugger;
}

async function getByGroupId(groupId: string, dayAgo: string = "7") {
  const group = await Group.findByPk(groupId);
  if (!group) return null;
  const numberDay = parseInt(dayAgo);
  const gteDate = dayjs().subtract(numberDay, "days").toDate();
  debugger;
  // @ts-expect-error
  const messages = await group.getReceivedMessages();
  return messages;
}

async function getGroupsMessagesByToken(token: string) {
  const user = await User.findOne({
    where: {
      token: token,
    },
  });
  if (!user) return null;
  const messages = [];
  // @ts-expect-error
  const groups = (await user.getGroups()) as Group[];
  if (!groups) return null;
  for (const group of groups) {
    // @ts-expect-error
    const data = await group.getReceivedMessages();
    messages.push({
      groupId: group.id,
      messages: data,
    });
  }

  return messages;
}

export default {
  getMessagesByToken,
  getGroupsMessagesByToken,
  sendMessage,
  getByGroupId,
};
