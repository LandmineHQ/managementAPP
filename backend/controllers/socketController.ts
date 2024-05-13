import ModelUser from "@models/User";
import ModelSocket from "@models/Socket";
import { io } from "@sockets/socket";
import { userSocketsMap } from "@sockets/socket";
import { Socket } from "socket.io";

function getUserSocketBySocketId(socketId: string): ModelSocket | undefined {
  return userSocketsMap.get(socketId);
}

async function socketMapAdd(socketId: string, socket: Socket) {
  const userController = await import("@controllers/userController").then(
    (module) => module.default
  );
  userSocketsMap.set(socketId, socket);
  updateSocketMapByUserSocket(socket);
}

async function updateSocketMapByUserSocket(socket: Socket) {
  const token = socket.handshake.auth.token;
  const user = await ModelUser.findOne({
    where: {
      token: token,
    },
    include: {
      model: ModelSocket,
    },
  });
  if (!user) return null;
  // @ts-expect-error
  if (!user.Socket) {
    // @ts-expect-error
    user.createSocket({
      socket_id: socket.id,
    });
  } else {
    // @ts-expect-error
    user.createSocket({
      socket_id: socket.id,
    });
  }
}

async function socketMapRemove(socketId: string) {
  const socket = getUserSocketBySocketId(socketId);
  userSocketsMap.delete(socketId);

  const socketModel = await ModelSocket.findByPk(socketId);
  if (socketModel) socketModel.destroy();
}

function pushNotificationGlobal(message: string) {
  io.send(message);
}

async function updateSocketIdByUser(user: ModelUser, socketId: string | null) {
  if (!socketId) {
    deleteSocketByUser(user);
    return null;
  }
  // @ts-expect-error
  let socket = (await user.getSocket()) as ModelSocket;
  if (!socket) {
    // @ts-expect-error
    socket = await user.createSocket({
      socket_id: socketId,
    });
  } else {
    socket.socket_id = socketId;
    socket.save();
  }
  return socket;
}

function deleteSocketByUser(user: ModelUser) {
  // @ts-expect-error
  user.setSocket(null);
}

async function disconnectAllSockets() {
  userSocketsMap.forEach((socket: Socket, key) => {
    socket.disconnect();
  });

  await ModelSocket.destroy({
    where: {},
  });
}

export default {
  pushNotificationGlobal,
  updateSocketIdByUser,
  getUserSocketBySocketId,
  disconnectAllSockets,

  socketMapAdd,
  socketMapRemove,
};
