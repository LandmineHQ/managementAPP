import { Server, Socket } from "socket.io";
import logConnection from "./logConnection";

function initMiddleware(io: Server) {
  io.use(logConnection);
}

export default initMiddleware;
