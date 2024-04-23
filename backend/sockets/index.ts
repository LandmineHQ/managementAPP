import { ServerOptions, Server as SocketIOServer } from "socket.io";
import log from "@utils/logger";
import { Server as HTTPServer } from "http";
import setupSocketEvent from "./events/connection";

enum SOCKET {
  CONNECT = "connect",
  DISCONNECT = "disconnect",
  ERROR = "error",
  MESSAGE = "message",
}

function setupSocket(server: HTTPServer) {
  const options = {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  } as ServerOptions;
  const io = new SocketIOServer(server, options);

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
export { SOCKET };
