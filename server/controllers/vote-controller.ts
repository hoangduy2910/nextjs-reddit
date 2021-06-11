import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import logging from "../configs/logging";
import constants from "../constants/constants";
import IVote from "../interfaces/vote";
import Vote from "../models/vote";
import Post from "../models/post";
import Comment from "../models/comment";

const NAMESPACE = "VoteController";

const vote = async (req: Request, res: Response) => {
  try {
    const { identifier, value, objectType } = req.body;

    // Validate Value
    const exceptedValues = [-1, 0, 1];
    if (!exceptedValues.includes(value)) {
      return res.status(StatusCodes.OK).json({
        success: false,
        error: "",
      });
    }

    // Get User
    const user = res.locals.user;

    // Get Post and Comment
    const post = await Post.findOne({ identifier });
    const comment = await Comment.findOne({ identifier });

    // Create or Update Vote
    let vote: IVote;
    if (post) {
      vote = await Vote.findOne({ user, post });
    } else if (comment) {
      vote = await Vote.findOne({ user, comment });
    }

    if (!vote && value === 0) {
      // Vote does not exist
      return res.status(StatusCodes.OK).json({
        success: false,
        error: constants.VOTE_NOT_EXIST,
      });
    } else if (!vote) {
      // Create New Vote
      vote = new Vote({ user, value, objectType });
      if (comment) vote.object = comment.id;
      else if (post) vote.object = post.id;
      await vote.save();
    } else if (value === 0) {
      // Remove Vote
      await vote.remove();
    } else if (vote.value != value) {
      // Update Vote
      vote.value = value;
      await vote.save();
    }
  } catch (err) {
    logging.ERROR(NAMESPACE, "vote", err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: constants.SERVER_ERROR,
    });
  }
};

export default {
  vote,
};
