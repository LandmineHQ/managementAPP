import { verifyToken } from "@jwt";
import ioLog from "@utils/ioLogger";
import { Socket } from "socket.io";

function logConnection(socket: Socket, next: Function) {
  ioLog.info(
    `Connection attempt from ${socket.handshake.address} ${socket.id}`
  );

  let isOK = true;
  // jwt verify
  const token = socket.handshake.auth.token;
  if (!token) {
    ioLog.info(`${socket.handshake.address} ${socket.id} 连接失败，没有token`);
    isOK = false;
  } else {
    if (verifyToken(token)) {
      ioLog.info(
        `${socket.handshake.address} ${socket.id} 连接成功，token 验证成功`
      );
    } else {
      ioLog.info(
        `${socket.handshake.address} ${socket.id} 连接失败，token 验证失败`
      );
      isOK = false;
    }
  }

  if (isOK) {
    next();
  } else {
    socket.disconnect();
  }
}

export default logConnection;
