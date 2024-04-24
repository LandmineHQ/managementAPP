const config = {
  port: process.env.PORT || "8080",
  host: process.env.HOST || "localhost",
  logLevel: process.env.LOG_LEVEL || "info",
  logDir: process.env.LOG_DIR || "./logs",
  logFileName: process.env.LOG_FILE_NAME || "latest.log",
  nodeEnv: process.env.NODE_ENV || "production",
};

export default config;
