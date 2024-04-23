import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import createRouter from "@routes";
import initMiddleware from "@middleware";

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// 挂载中间件
initMiddleware(app);
// 挂载路由
app.use(createRouter());

export default app;
