import { SOCKET_EVENT } from "@sockets";
import log from "@utils/logger";
import { Socket } from "socket.io";

/**
 * 初始化
 */
function setupSocketEvent(socket: Socket) {
  addEventListener(socket, SOCKET_EVENT.MESSAGE, handleMessage);
  addEventListener(socket, SOCKET_EVENT.DISCONNECT, handleDisconnect);
  addEventListener(socket, SOCKET_EVENT.ERROR, handleError);
}

function handleMessage(socket: Socket, data: any) {
  socket.send(`server recived message: ${data}`);
}

function handleDisconnect(socket: Socket) {}

function handleError(socket: Socket) {}

export default setupSocketEvent;

// 添加事件监听器函数
function addEventListener(
  socket: Socket,
  event: string,
  handle: (socket: Socket, data: any) => void
) {
  socket.on(event, (data) => {
    // 自动记录每个事件的调用
    log.info(
      `Event '${event}' from ${socket.handshake.address} ${
        socket.id
      } received with data: ${JSON.stringify(data)}`
    );
    handle(socket, data);
  });
}
