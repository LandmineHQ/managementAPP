/** 检测环境配置是否恰当
 *
 */
import net from "net";
import config from "config";
import log from "@utils/logger";

/**
 * 找到可用端口
 * @param startingPort 起始端口
 * @returns
 */
function __findAvailablePort(startingPort: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const server = net.createServer();

    server.listen(startingPort, () => {
      server.once("close", () => {
        resolve(startingPort);
      });
      server.close();
    });

    server.on("error", (err: any) => {
      if (err.code === "EADDRINUSE") {
        log.info(`Port ${startingPort} is already in use. Trying next port...`);
        let nextPort: number = parseInt(startingPort, 10) + 1;
        resolve(__findAvailablePort(nextPort.toString(10))); // 如果当前端口被占用，尝试下一个端口
      } else {
        reject(err);
      }
    });
  });
}

async function findAvailablePort() {
  const port = await __findAvailablePort(config.get<string>("port"))
    .then((port) => port)
    .catch((error) => {
      log.error(error);
      return "-1";
    });

  return port;
}

export { findAvailablePort };
