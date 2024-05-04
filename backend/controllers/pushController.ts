import { io } from "@sockets";

function pushNotificationGlobal(message: string) {
  io.send(message);
}

export default { pushNotificationGlobal };
