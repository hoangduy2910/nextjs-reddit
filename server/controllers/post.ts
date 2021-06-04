import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import logging from "../configs/logging";
import helpers from "../utils/helpers";
import constants from "../constants/constants";
import Post from "../models/post";

const NAMESPACE = "PostController";

const createPost = async (req: Request, res: Response) => {
  try {
    const { title, body, subName } = req.body;

    // Validate Title
    if (!title.trim()) {
      return res.status(StatusCodes.OK).json({
        success: false,
        error: {
          title: constants.TITLE_EMPTY,
        },
      });
    }

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
      subName,
    });

    // Save Post
    await newPost.save();
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
