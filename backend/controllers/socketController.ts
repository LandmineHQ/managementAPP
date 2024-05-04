import Socket from "@models/Socket";
import User from "@models/User";
import { io } from "@sockets";
import { Socket as SocketType } from "socket.io";

function pushNotificationGlobal(message: string) {
  io.send(message);
}

async function updateSocketIdByUser(user: User, socketId: string | null) {
  if (!socketId) {
    deleteSocketByUser(user);
    return null;
  }
  // @ts-expect-error
  let socket = (await user.getSocket()) as Socket;
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

function deleteSocketByUser(user: User) {
  // @ts-expect-error
  user.setSocket(null);
}

async function deleteSocketBySocketId(socketId: string) {
  const socket = await Socket.findByPk(socketId);
  if (socket) {
    socket.destroy();
  }
}

export default {
  pushNotificationGlobal,
  updateSocketIdByUser,
  deleteSocketBySocketId,
};
