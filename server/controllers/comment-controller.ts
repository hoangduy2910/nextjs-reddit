import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";

import logging from "../configs/logging";
import constants from "../constants/constants";
import helpers from "../utils/helpers";
import Comment from "../models/comment";
import Post from "../models/post";

const NAMESPACE = "CommentController";

const createComment = async (req: Request, res: Response) => {
  // Validate Input
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(StatusCodes.OK).json({
      success: false,
      error: helpers.validateInput(errors.array()),
    });
  }

  try {
    const { body } = req.body;
    const { identifier, slug } = req.params;

    // Validate Post
    const post = await Post.findOne({ identifier, slug });
    if (!post) {
      return res.status(StatusCodes.OK).json({
        success: false,
        error: constants.POST_NOT_EXIST,
      });
    }

    // Generate Identifier
    const id = helpers.generateIdentifier(8);

    // Get User
    const user = res.locals.user;

    // Save Community
    const newComment = new Comment({
      identifier: id,
      body,
      user,
      post,
    });
    await newComment.save();

    return res.status(StatusCodes.OK).json({
      success: true,
    });
  } catch (err) {
    logging.ERROR(NAMESPACE, "createComment", err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: constants.SERVER_ERROR,
    });
  }
};

export default {
  createComment,
};
