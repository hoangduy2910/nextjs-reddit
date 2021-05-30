import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

const auth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies;
  if (!token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ success: false, error: "Unauthentication !!!" });
  }

  const isValidToken = jwt.verify(token, process.env.SECRET_KEY);
  if (!isValidToken) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ success: false, error: "Invalid Token !!!" });
  }

  next();
};

export default auth;
