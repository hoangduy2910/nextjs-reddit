import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";

import logging from "../configs/logging";
import constants from "../constants/constants";
import helpers from "../utils/helpers";
import Community from "../models/community";

const NAMESPACE = "CommunityController";

const createCommunity = async (req: Request, res: Response) => {
  // Validate Input
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(StatusCodes.OK).json({
      success: false,
      error: helpers.validateInput(errors.array()),
    });
  }

  try {
    const { name, title, description } = req.body;

    // Validate Name
    const community = await Community.findOne({ name });
    if (community) {
      return res.status(StatusCodes.OK).json({
        success: false,
        error: {
          name: constants.COMMUNITY_NAME_EXIST,
        },
      });
    }

    // Get User
    const user = res.locals.user;

    // Save Community
    const newCommunity = new Community({
      name,
      title,
      description,
      user,
      posts: [],
      image: null,
      banner: null,
    });
    await newCommunity.save();

    return res.status(StatusCodes.OK).json({
      success: true,
    });
  } catch (err) {
    logging.ERROR(NAMESPACE, "createCommunity", err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: constants.SERVER_ERROR,
    });
  }
};

export default {
  createCommunity,
};
