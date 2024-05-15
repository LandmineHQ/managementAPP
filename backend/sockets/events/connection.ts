import socketController from "@controllers/socketController";
import log from "@utils/ioLogger";
import dayjs from "dayjs";
import { Socket } from "socket.io";

/**
 * 初始化
 */
function setupSocketEvent(socket: Socket) {
  socket.use(([event, ...args], next) => {
    // 自动记录每个事件的调用
    log.info(
      `Event '${event}' from ${socket.handshake.address}(${
        socket.id
      }) received with data: ${JSON.stringify(args)}`
    );
    // do not forget to call next
    next();
  });

  socket.addListener("disconnect", handleDisconnect);
  socket.addListener("error", handleError);
  socket.addListener("message", handleMessage);
}

function handleMessage(this: Socket, message: string) {
  const response = `${dayjs().format("HH:mm:ss.SSS")} ${message}`;
  this.send(response);
}

async function handleDisconnect(this: Socket, reason: string) {
  socketController.socketMapRemove(this.id);
}

function handleError(socket: Socket) {
  log.error(`Socket: ${socket.id} occurred an error: ${socket._error}`);
}

export default setupSocketEvent;
