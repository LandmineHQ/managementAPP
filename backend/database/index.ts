import { Sequelize, SyncOptions } from "sequelize";
import config from "config";
import dblogger from "@/utils/dblogger";
import { loadModelsAssociations } from "@models";

const sequelize = new Sequelize(
  config.get("dbConfig.database"),
  config.get("dbConfig.username"),
  config.get("dbConfig.password"),
  {
    host: config.get("dbConfig.host"),
    port: config.get("dbConfig.port"),
    dialect: config.get("dbConfig.dialect"),
  }
);

async function initModels() {
  loadModelsAssociations();
  await testDatabaseConnection();
  await syncDatabase();
}

/** 测试数据库连接 */
async function testDatabaseConnection() {
  dblogger.info("test database connection...");
  await sequelize
    .authenticate()
    .then(async () => {
      dblogger.info("Database connection has been established successfully.");
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
      process.exit(1);
    });
}

/** 同步数据库 */
async function syncDatabase(options: SyncOptions = { alter: true }) {
  dblogger.info("sync database...");
  await sequelize
    .sync(options)
    .then(() => {
      dblogger.info("sync database done.");
    })
    .catch(() => {
      dblogger.error("sync database failed.");
    });
}

export { initModels, sequelize };
