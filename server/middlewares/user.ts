import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../models/user";
import logging from "../configs/logging";
import constants from "../constants/constants";

const NAMESPACE = "USER";
dotenv.config();

const user = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) return next();

    const { userName }: any = jwt.verify(token, process.env.SECRET_KEY);
    if (!userName) {
      return res
        .status(StatusCodes.OK)
        .json({ success: false, error: constants.TOKEN_INVALID });
    }

    const user = await User.findOne({ userName });
    if (!user) {
      return res
        .status(StatusCodes.OK)
        .json({ success: false, error: constants.UNAUTHENTICATION });
    }

    res.locals.user = user;
    return next();
  } catch (err) {
    logging.ERROR(NAMESPACE, "Middleware", err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: constants.SERVER_ERROR });
  }
};

export default user;
