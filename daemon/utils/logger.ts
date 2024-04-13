import pino from "pino";
import multistream from "pino-multi-stream";
import dayjs from "dayjs";
import config from "config";
import fs from "fs";
import path from "path";
import stream from "stream";

// 相关配置
const logDir = config.get<string>("logDir");
const logFileName = config.get<string>("logFileName");
const logFilePath = path.join(logDir, logFileName);
const launchTime = dayjs().format("YYYY-MM-DD HH:mm:ss"); // 启动时间

// 确保日志目录存在
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// 自定义日志格式
const customLogFormat = (logObject: any) => {
  const time = dayjs().format("YYYY-MM-DD HH:mm:ss.SSS");
  return `[${time}] [${pino.levels.labels[logObject.level].toUpperCase()}] (${
    logObject.name
  }): ${logObject.msg}\n`;
};

// 自定义流，用于控制台输出
const customPrettyStream = new stream.Writable({
  write(
    chunk: { toString: () => string },
    encoding: string,
    callback: Function
  ) {
    const logObject = JSON.parse(chunk.toString());
    process.stdout.write(customLogFormat(logObject));
    callback();
  },
});

// 日志文件输出流
const streams = [
  { stream: fs.createWriteStream(logFilePath) },
  { stream: customPrettyStream },
] as multistream.Streams;

// pino配置
const pinoConfig = {
  level: config.get<string>("logLevel"),
  base: {
    name: "server",
  },
  timestamp: () => `,"time":"${dayjs().format("YYYY-MM-DD HH:mm:ss.SSS")}"`,
} as pino.LoggerOptions;

// 日志记录工具
const log = pino(pinoConfig, multistream.multistream(streams));

// 关闭程序时重命名日志文件夹
function onExit() {
  const newLogFilePath = path.join(logDir, `${launchTime}.log`);
  fs.renameSync(logFilePath, newLogFilePath);
}

export default log;
export { onExit };
