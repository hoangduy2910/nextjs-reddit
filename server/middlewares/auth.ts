import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../models/user";
import logging from "../configs/logging";
import constants from "../constants/constants";

const NAMESPACE = "AUTH";
dotenv.config();

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res
        .status(StatusCodes.OK)
        .json({ success: false, error: constants.UNAUTHENTICATION });
    }

    const { userName }: any = jwt.verify(token, process.env.SECRET_KEY);
    if (!userName) {
      return res
        .status(StatusCodes.OK)
        .json({ success: false, error: constants.TOKEN_INVALID });
    }

    const user = await User.findOne({ userName });
    res.locals.user = user;

    next();
  } catch (err) {
    logging.ERROR(NAMESPACE, "Middleware", err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: constants.SERVER_ERROR });
  }
};

export default auth;
