import Group from "@models/Group";
import Image from "@models/Image";
import Message from "@models/Message";
import User from "@models/User";
import dayjs from "dayjs";
import { Op } from "sequelize";
import socketController from "./socketController";

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
    receiverGroupId: number;
  }
) {
  const user = await User.findOne({
    where: {
      token: token,
    },
  });
  if (!user) return null;
  let message: Message | null = null;
  switch (data.type) {
    case "image": {
      let image = await Image.findOne({ where: { src: data.content } });
      if (!image) {
        image = await Image.create({
          src: data.content,
        });
      }
      data.content = image.id.toString();
      // @ts-expect-error
      message = await user.createSentMessage(data);
      break;
    }
    case "text":
    case "record":
      // @ts-expect-error
      message = await user.createSentMessage(data);
      break;
  }

  socketController.pushMessage(message);
  return message;
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

async function messagesSetReadByToken(token: string, senderId: string) {
  const user = await User.findOne({
    where: {
      token: token,
    },
    include: {
      model: Message,
      as: "receivedMessages",
      where: {
        senderId,
        isRead: {
          [Op.not]: true,
        },
      },
    },
  });
  if (!user) return null;
  // @ts-expect-error
  const receivedMessages = user.receivedMessages as Message[];
  receivedMessages.forEach(async (message) => {
    message.isRead = true;
    message.save();
  });
}

export default {
  getMessagesByToken,
  getGroupsMessagesByToken,

  sendMessage,
  getByGroupId,

  messagesSetReadByToken,
};
