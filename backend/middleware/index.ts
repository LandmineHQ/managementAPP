import { Express } from "express";
import express from "express";
import responseHeader from "./responseHeader";
import logRequest from "./logRequest";

function initMiddleware(app: Express) {
  app.use(express.json());
  app.use(responseHeader);
  app.use(logRequest);
}

export default initMiddleware;
