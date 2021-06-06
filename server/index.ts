import express, { Application } from "express";
import dotenv from "dotenv";
import next from "next";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

import config from "./configs/config";
import logging from "./configs/logging";
import trim from "./middlewares/trim";
import logger from "./middlewares/logger";
import userRoutes from "./routes/user-route";
import postRoutes from "./routes/post-route";
import communityRoutes from "./routes/community-route";

dotenv.config();

const NAMESPACE = "Server";
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });

app
  .prepare()
  .then(() => {
    const server: Application = express();

    // Parse application/x-www-form-urlencoded
    server.use(bodyParser.urlencoded({ extended: false }));

    // Parse application/json
    server.use(bodyParser.json());

    // Parse Cookie
    server.use(cookieParser());

    // Allows for cross origin domain request:
    server.use(
      cors({
        credentials: true,
        origin: process.env.ORIGIN,
        optionsSuccessStatus: 200,
      })
    );

    // Middlewares
    server.use(trim);
    server.use(logger);

    // Health Check
    server.get("/api/health-check", (req, res) => {
      return res.send("OK");
    });

    // Routes
    server.use("/api/users", userRoutes);
    server.use("/api/posts", postRoutes);
    server.use("/api/communities", communityRoutes);

    /** Error Handler */
    server.use((req, res, next) => {
      const error = new Error("Not found");

      return res.status(200).json({
        success: false,
        error: error.message,
      });
    });

    server.listen(config.server.port, () => {
      logging.INFO(
        NAMESPACE,
        `Ready on http://${config.server.hostname}:${config.server.port} !!!`
      );
    });

    // Connect MongoDB
    mongoose
      .connect(config.mongo.url, config.mongo.options)
      .then(() => logging.INFO(NAMESPACE, "Connected to MongoDB !!!"))
      .catch((err) => logging.ERROR(NAMESPACE, err.message, err));
  })
  .catch((err) => logging.ERROR(NAMESPACE, "Failed !!!", err));
