import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

import logging from "../configs/logging";
import constants from "../constants/constants";

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

    next();
  } catch (err) {
    logging.ERROR("AUTH", "Auth - Middleware", err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: constants.SERVER_ERROR });
  }
};

export default auth;
