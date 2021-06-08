import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";

import logging from "../configs/logging";
import helpers from "../utils/helpers";
import constants from "../constants/constants";
import Post from "../models/post";
import Community from "../models/community";

const NAMESPACE = "PostController";

const getPosts = async (_: Request, res: Response) => {
  try {
    const posts = await Post.find({})
      .populate("community", "name")
      .populate("user", "userName")
      .sort({ createdAt: -1 });
    return res
      .status(StatusCodes.OK)
      .json({ success: true, data: posts.map((post) => post.toObject()) });
  } catch (err) {
    logging.ERROR(NAMESPACE, "[getPosts]", err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: constants.SERVER_ERROR });
  }
};

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
    const { title, body, communityName } = req.body;

    // Validate Community
    const community = await Community.findOne({ name: communityName });
    if (!community) {
      return res.status(StatusCodes.OK).json({
        success: false,
        error: {
          communityName: constants.COMMUNITY_NOT_EXIST,
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
      community,
      user,
    });
    await newPost.save();

    return res.status(StatusCodes.OK).json({
      success: true,
    });
  } catch (err) {
    logging.ERROR(NAMESPACE, "[createPost]", err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: constants.SERVER_ERROR });
  }
};

export default {
  getPosts,
  createPost,
};
