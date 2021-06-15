import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { validationResult } from "express-validator";
import { startSession } from "mongoose";

import logging from "../configs/logging";
import constants from "../constants/constants";
import helper from "../utils/helpers";
import IVote from "../interfaces/vote";
import Vote from "../models/vote";
import Post from "../models/post";
import Comment from "../models/comment";

const NAMESPACE = "VoteController";

const vote = async (req: Request, res: Response) => {
  // Validate Input
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(StatusCodes.OK).json({
      success: false,
      error: helper.validateInput(errors.array()),
    });
  }

  try {
    const { identifier, value, objectType } = req.body;

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
      const session = await startSession();
      session.startTransaction();
      vote = new Vote({ user, value, objectType });
      if (comment) {
        vote.object = comment.id;
        comment.votes.push(vote.id);
        await comment.save({ session });
      } else if (post) {
        vote.object = post.id;
        post.votes.push(vote.id);
        await post.save({ session });
      }
      await vote.save({ session });
      await session.commitTransaction();
    } else if (value === 0) {
      // Remove Vote
      await vote.remove();
    } else if (vote.value != value) {
      // Update Vote
      vote.value = value;
      await vote.save();
    }

    return res.status(StatusCodes.OK).json({
      success: true,
    });
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
