import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";

import logging from "../configs/logging";
import helpers from "../utils/helpers";
import constants from "../constants/constants";
import Post from "../models/post";
import Sub from "../models/sub";

const NAMESPACE = "PostController";

const createPost = async (req: Request, res: Response) => {
  // Validate Input
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(StatusCodes.OK).json({
      success: false,
      error: helpers.validateInput(errors.array()),
    });
  }

  try {
    const { title, body, subName } = req.body;

    // Validate Sub
    const sub = await Sub.findOne({ name: subName });
    if (!sub) {
      return res.status(StatusCodes.OK).json({
        success: false,
        error: {
          subName: constants.SUB_NOT_EXIST,
        },
      });
    }

    // Get User
    const user = res.locals.user;

    // Generate Identifier
    const identifier = helpers.generateIdentifier(7);

    // Generate Slug
    const slug = helpers.slugify(title);

    // Create New Post
    const newPost = new Post({
      identifier,
      title,
      slug,
      body,
      sub,
      user,
    });
    await newPost.save();

    return res.status(StatusCodes.OK).json({
      success: true,
    });
  } catch (err) {
    logging.ERROR(NAMESPACE, "[createPost]", err);
    return res.json({ success: false, error: constants.SERVER_ERROR });
  }
};

const updatePost = async (req: Request, res: Response) => {};

const deletePost = async (req: Request, res: Response) => {};

export default {
  createPost,
  updatePost,
  deletePost,
};
