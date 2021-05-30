import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import cookie from "cookie";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import logging from "../configs/logging";
import constants from "../constants/constants";
import User from "../models/user";
import IUser from "../interfaces/user";

const NAMESPACE = "UserController";

const getUserById = async (req: Request, res: Response) => {
  const id = req.params.id;

  // Fetch User
  let user: IUser;
  try {
    user = await User.findById(id);
  } catch (err) {
    logging.ERROR(NAMESPACE, "getUserById", err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: constants.SERVER_ERROR });
  }

  if (!user) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ success: false, error: constants.USER_NOT_EXIST });
  }

  return res.status(StatusCodes.OK).json({ success: true, data: user });
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Validate Input
  if (!email || !password) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      error: constants.EMAIL_PASSWORD_EMPTY,
    });
  }

  // Validate Email
  let user: IUser;
  try {
    user = await User.findOne({ email });
  } catch (err) {
    logging.ERROR(NAMESPACE, "login", err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: constants.SERVER_ERROR });
  }

  if (!user) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ success: false, error: constants.USER_NOT_EXIST });
  }

  // Vaidate Password
  let passwordIsValid: boolean;
  try {
    passwordIsValid = await bcrypt.compare(password, user.password);
  } catch (err) {
    logging.ERROR(NAMESPACE, "login", err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: constants.SERVER_ERROR });
  }

  if (!passwordIsValid) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ success: false, error: constants.PASSWORD_INVALID });
  }

  // Generate Token
  const token = jwt.sign({ userName: user.userName }, process.env.SECRET_KEY);
  res.set(
    "Set-Cookie",
    cookie.serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600,
      path: "/",
    })
  );

  return res.status(StatusCodes.OK).json({
    success: true,
    data: user,
  });
};

const logout = (req: Request, res: Response) => {
  res.set(
    "Set-Cookie",
    cookie.serialize("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    })
  );
  return res.status(StatusCodes.OK).json({ success: true });
};

const getUserProfile = async (req: Request, res: Response) => {
  const { token } = req.cookies;
  const userName = jwt.verify(token, process.env.SECRET_KEY);

  // Fetch User
  let user: IUser;
  try {
    user = await User.findOne({ userName });
  } catch (err) {
    logging.ERROR(NAMESPACE, "getUserProfile", err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: constants.SERVER_ERROR });
  }

  if (!user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ success: false, error: constants.USER_NOT_EXIST });
  }

  return res.status(StatusCodes.OK).json({ success: true, data: user });
};

const createUser = async (req: Request, res: Response) => {
  const { email, userName, password, confirmPassword } = req.body;

  let existedUser: IUser;

  // Validate Password
  if (password !== confirmPassword) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ success: false, error: constants.PASSWORD_NOT_MATCH });
  }

  // Validate Email
  try {
    existedUser = await User.findOne({ email });
    if (existedUser) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ success: false, error: constants.EMAIL_EXIST });
    }
  } catch (err) {
    logging.ERROR(NAMESPACE, "createUser", err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: constants.SERVER_ERROR });
  }

  // Validate User Name
  try {
    existedUser = await User.findOne({ userName });
    if (existedUser) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ success: false, error: constants.USERNAME_EXIST });
    }
  } catch (err) {
    logging.ERROR(NAMESPACE, "createUser", err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: constants.SERVER_ERROR });
  }

  // Create Hashed Password
  let hashedPassword: string;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    logging.ERROR(NAMESPACE, "createUser", err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: constants.SERVER_ERROR });
  }

  // Create New User
  const newUser = new User({
    email,
    userName,
    password: hashedPassword,
    firstName: null,
    lastName: null,
    image: "/uploads/user-default.png",
    posts: [],
  });

  try {
    await newUser.save();
  } catch (err) {
    logging.ERROR(NAMESPACE, "createUser", err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: constants.SERVER_ERROR });
  }

  return res.status(StatusCodes.OK).json({ success: true });
};

const updateUser = async (req: Request, res: Response) => {};

export default {
  login,
  logout,
  getUserById,
  getUserProfile,
  createUser,
  updateUser,
};

// exports.login = login;
// exports.logout = logout;
// exports.getUserById = getUserById;
// exports.getUserProfile = getUserProfile;
// exports.createUser = createUser;
// exports.updateUser = updateUser;
