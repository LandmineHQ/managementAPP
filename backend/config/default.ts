const config = {
  port: process.env.PORT || "8080",
  host: process.env.HOST || "localhost",
  logLevel: process.env.LOG_LEVEL || "info",
  logDir: process.env.LOG_DIR || "./logs",
  logFileName: process.env.LOG_FILE_NAME || "latest.log",
  nodeEnv: process.env.NODE_ENV || "production",
};

// 开发模式
if (process.env.NODE_ENV === "development") {
  config.port = "3000";
  config.host = "0.0.0.0";
  config.logLevel = "debug";
}

export default config;
