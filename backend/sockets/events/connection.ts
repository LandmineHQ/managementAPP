import log from "@utils/logger";
import { Socket } from "socket.io";

/**
 * 初始化
 */
function setupSocketEvent(socket: Socket) {
  addEventListener(socket, "message", handleMyCustomEvent);
  addEventListener(socket, "disconnect", handleDisconnect);
  addEventListener(socket, "error", handleError);
}

function handleMyCustomEvent(socket: Socket) {}

function handleDisconnect(socket: Socket) {}

function handleError(socket: Socket) {}
// 事件监听器函数
function addEventListener(
  socket: Socket,
  event: string,
  handle: (data: any) => void
) {
  socket.on(event, (data) => {
    // 自动记录每个事件的调用
    log.info(
      `Event '${event}' received with data: ${JSON.stringify(
        data
      )} from socket ID: ${socket.id}`
    );
    handle(data);
  });
}

export default setupSocketEvent;
