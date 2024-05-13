import { ServerOptions, Socket, Server as SocketIOServer } from "socket.io";
import { Server as HTTPServer } from "http";
import setupSocketEvent from "./events/connection";
import initMiddleware from "@sockets/middleware";
import socketController from "@controllers/socketController";
import log from "@utils/logger";

let io: SocketIOServer;
const userSocketsMap = new Map();

const options = {
  cors: {
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["PUT", "POST", "GET", "DELETE", "OPTIONS"],
    exposedHeaders: ["Content-Disposition"],
  },
  allowRequest(req, fn) {
    if (process.env.NODE_ENV === "development") {
      // 在开发环境中允许所有跨域请求
      fn(null, true);
    } else {
      // 在生产环境中，您可以添加更多的逻辑来决定是否允许请求
      // 例如，基于请求的来源或其他安全考虑
      // 这里只是一个简单的示例
      fn(null, false); // 不允许跨域请求
    }
  },
} as ServerOptions;

async function setupSocket(server: HTTPServer) {
  log.info("socket.io launching...");

  io = new SocketIOServer(server, options);
  initMiddleware(io);

  io.on("connection", async (socket) => {
    socketController.socketMapAdd(socket.id, socket);
    setupSocketEvent(socket);
  });

  await socketController.disconnectAllSockets();
  log.info("socket.io launched");
}

export default { setupSocket };
export { io, userSocketsMap };
