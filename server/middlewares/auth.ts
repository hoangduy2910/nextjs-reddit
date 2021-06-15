import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import dotenv from "dotenv";

import logging from "../configs/logging";
import constants from "../constants/constants";

const NAMESPACE = "AUTH";
dotenv.config();

const auth = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const user = res.locals.user;
    if (!user) {
      return res.status(StatusCodes.OK).json({
        success: false,
        error: constants.UNAUTHENTICATION,
      });
    }
    return next();
  } catch (err) {
    logging.ERROR(NAMESPACE, "Middleware", err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: constants.SERVER_ERROR });
  }
};

export default auth;
