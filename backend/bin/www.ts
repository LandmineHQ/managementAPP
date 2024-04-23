#!/usr/bin/env tsx
log.info(`
+-----------------------------------+
|                                   |
|   县域工业企业数智化管理平台APP   |
|            launching              |
+-----------------------------------+
`);

// 加载环境变量
import "dotenv/config";
import { findAvailablePort } from "./envDetect";

import http from "http";
import log from "@utils/logger";
import { onExit as loggerOnExit } from "@utils/logger";
import config from "config";
import setupSocket from "@sockets/index";
import app from "@app";

/**
 * Get port from environment and store in Express.
 */
const port = await findAvailablePort();
const host = config.get<string>("host");

/**
 * Create HTTP server.
 */
const server = http.createServer(app);
// 挂载socket.io
setupSocket(server);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(parseInt(port), host);
server.on("error", onError);
server.on("listening", onListening);
server.on("close", onExit);

/* 程序退出时关闭server */
process.once("SIGINT", (...args) => {
  log.info(args.toString());
  server.close(() => {
    process.exit(0); // 可选：确保进程退出
  });
});

/* 函数 */

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error: NodeJS.ErrnoException) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const addr = server.address();
  let bind: string = "";
  if (typeof addr === "string" || addr === null) {
    bind = "pipe ";
  } else if (typeof addr === "object") {
    bind = `http://${addr.address}:${addr.port}`;
  }
  log.info("Listening on " + bind);
}

function onExit() {
  loggerOnExit();
  log.info("exited");
}
