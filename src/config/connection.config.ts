import mongoose from "mongoose";
import settings from "../constants/settings";
import { Application } from "express";
import logger from "./logger.config";

const startServer = (app: Application) => {
  mongoose
    .connect(settings.mongo.url as string)
    .then(() => {
      app.listen(settings.port, () => {
        logger.info(`Server is listening on port ${settings.port}`);
      });
    })
    .catch((error: any) => {
      logger.error(`Unable to connect to mongoose server, ${error.toString()}`);
      process.exit(1);
    });
};

export default startServer;