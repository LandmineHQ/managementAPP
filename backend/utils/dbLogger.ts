import pino from "pino";
import multistream from "pino-multi-stream";
import dayjs from "dayjs";
import config from "config";
import { streams } from "./logger";

// pino配置
const pinoConfig = {
  level: config.get<string>("logLevel"),
  base: {
    name: "database",
  },
  timestamp: () => `,"time":"${dayjs().format("YYYY-MM-DD HH:mm:ss.SSS")}"`,
} as pino.LoggerOptions;

// 日志记录工具
const dbLog = pino(pinoConfig, multistream.multistream(streams));

export default dbLog;
