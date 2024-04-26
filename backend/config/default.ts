import "dotenv/config";

const config = {
  port: process.env.PORT || "8080",
  host: process.env.HOST || "localhost",
  logLevel: process.env.LOG_LEVEL || "info",
  logDir: process.env.LOG_DIR || "./logs",
  logFileName: process.env.LOG_FILE_NAME || "latest.log",

  dbConfig: {
    username: process.env.DB_CONFIG_USERNAME || "username",
    password: process.env.DB_CONFIG_PASSWORD || "password",
    database: process.env.DB_CONFIG_DATABASE || "management",
    host: process.env.DB_CONFIG_HOST || "localhost",
    port: process.env.DB_CONFIG_PORT || "3306",
    dialect: process.env.DB_CONFIG_DIALECT || "mysql",
  },

  jwtConfig: {
    secret: process.env.JWT_CONFIG_SECRET || "secret",
    expiresIn: process.env.JWT_CONFIG_EXPIRES_IN || "72h",
  },

  mailerConfig: {
    host: process.env.MAILER_CONFIG_HOST || "smtp.ethereal.email",
    port: process.env.MAILER_CONFIG_PORT || 587,
    secure: process.env.MAILER_CONFIG_SECURE === "true" ? true : false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.MAILER_CONFIG_AUTH_USER || "maddison53@ethereal.email",
      pass: process.env.MAILER_CONFIG_AUTH_PASS || "jn7jnAPss4f63QBp6D",
    },
  },
};

export default config;
