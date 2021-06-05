import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";

import logging from "../configs/logging";
import constants from "../constants/constants";
import helpers from "../utils/helpers";
import Sub from "../models/sub";

const NAMESPACE = "SubController";

const createSub = async (req: Request, res: Response) => {
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
    const sub = await Sub.findOne({ name });
    if (sub) {
      return res.status(StatusCodes.OK).json({
        success: false,
        error: {
          name: constants.SUB_NAME_EXIST,
        },
      });
    }

    // Get User
    const user = res.locals.user;

    // Save Sub
    const newSub = new Sub({
      name,
      title,
      description,
      user,
      posts: [],
      image: null,
      banner: null,
    });
    await newSub.save();

    return res.status(StatusCodes.OK).json({
      success: true,
    });
  } catch (err) {
    logging.ERROR(NAMESPACE, "createSub", err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: constants.SERVER_ERROR,
    });
  }
};

export default {
  createSub,
};
