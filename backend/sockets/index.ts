import { Socket, Server as SocketIOServer } from "socket.io";
import log from "@utils/logger";
import { Server } from "http";
import setupSocketEvent from "./events/connection";

function setupSocket(server: Server) {
  const io = new SocketIOServer(server);

  io.on("connection", (socket) => {
    // 记录新用户连接
    log.info(
      `A user(${
        socket.request.headers["x-forwarded-for"] ||
        socket.request.socket.remoteAddress
      }) connected with socket ID: ${socket.id}`
    );
    setupSocketEvent(socket);
  });
}

export default setupSocket;
