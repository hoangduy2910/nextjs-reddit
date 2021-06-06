import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { validationResult } from "express-validator";
import cookie from "cookie";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import logging from "../configs/logging";
import constants from "../constants/constants";
import helpers from "../utils/helpers";
import User from "../models/user";

const NAMESPACE = "UserController";

dotenv.config();

const getUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id);
    if (!user) {
      return res.status(StatusCodes.OK).json({
        success: false,
        error: {
          id: constants.USER_NOT_EXIST,
        },
      });
    }

    return res
      .status(StatusCodes.OK)
      .json({ success: true, data: user.toObject() });
  } catch (err) {
    logging.ERROR(NAMESPACE, "getUserById", err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: {
        server: constants.SERVER_ERROR,
      },
    });
  }
};

const login = async (req: Request, res: Response) => {
  // Validate Input
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.json({
      success: false,
      error: helpers.validateInput(errors.array()),
    });
  }

  try {
    const { userName, password } = req.body;

    // Validate USername
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(StatusCodes.OK).json({
        success: false,
        error: {
          userName: constants.USER_NOT_EXIST,
        },
      });
    }

    // Vaidate Password
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      return res.status(StatusCodes.OK).json({
        success: false,
        error: {
          password: constants.PASSWORD_INVALID,
        },
      });
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
      data: user.toObject(),
    });
  } catch (err) {
    logging.ERROR(NAMESPACE, "login", err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: {
        server: constants.SERVER_ERROR,
      },
    });
  }
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
  try {
    const { token } = req.cookies;
    const userName = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findOne({ userName });
    if (!user) {
      return res
        .status(StatusCodes.OK)
        .json({ success: false, error: constants.USER_NOT_EXIST });
    }

    return res
      .status(StatusCodes.OK)
      .json({ success: true, data: user.toObject() });
  } catch (err) {
    logging.ERROR(NAMESPACE, "getUserProfile", err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: {
        server: constants.SERVER_ERROR,
      },
    });
  }
};

const createUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.json({
      success: false,
      error: helpers.validateInput(errors.array()),
    });
  }

  try {
    const { email, userName, password } = req.body;

    // Validate Existed Email
    const existedEmail = await User.findOne({ email });
    if (existedEmail) {
      return res.status(StatusCodes.OK).json({
        success: false,
        error: {
          email: constants.EMAIL_EXIST,
        },
      });
    }

    // Validate Existed UserName
    const existedUserName = await User.findOne({ userName });
    if (existedUserName) {
      return res.status(StatusCodes.OK).json({
        success: false,
        error: {
          userName: constants.USERNAME_EXIST,
        },
      });
    }

    // Create Hashed Password
    const hashedPassword = await bcrypt.hash(password, 12);

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

    // Save User
    await newUser.save();

    // Response
    return res.status(StatusCodes.OK).json({ success: true });
  } catch (err) {
    logging.ERROR(NAMESPACE, "createUser", err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: {
        server: constants.SERVER_ERROR,
      },
    });
  }
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
