import { check } from "express-validator";
import constants from "../constants/constants";

// Validate User
const register = () => {
  return [
    check("email", constants.EMAIL_EMPTY).not().isEmpty(),
    check("email", constants.EMAIL_INVALID).normalizeEmail().isEmail(),
    check("userName", constants.USERNAME_EMPTY).not().isEmpty(),
    check("password", constants.PASWORD_EMPTY).not().isEmpty(),
    check("password", constants.PASSWORD_MIN_LENGTH).isLength({
      min: 6,
    }),
    check("password").custom((password, { req }) => {
      if (password !== req.body.confirmPassword) {
        throw new Error(constants.PASSWORD_NOT_MATCH);
      }
      return true;
    }),
    check("confirmPassword", constants.CONFIRM_PASWORD_EMPTY).not().isEmpty(),
    check("confirmPassword", constants.CONFIRM_PASWORD_MIN_LENGTH).isLength({
      min: 6,
    }),
  ];
};

const login = () => {
  return [
    check("userName", constants.USERNAME_EMPTY).not().isEmpty(),
    check("password", constants.PASWORD_EMPTY).not().isEmpty(),
    check("password", constants.PASSWORD_MIN_LENGTH).isLength({
      min: 6,
    }),
  ];
};

// Validate Post
const createPost = () => {
  return [
    check("title", constants.POST_TITLE_EMPTY).not().isEmpty(),
    check("communityName", constants.COMMUNITY_NAME_EMPTY).not().isEmpty(),
  ];
};

// Validate Community
const createCommunity = () => {
  return [
    check("name", constants.COMMUNITY_NAME_EMPTY).not().isEmpty(),
    check("title", constants.POST_TITLE_EMPTY).not().isEmpty(),
  ];
};

// Validate Comment
const createComment = () => {
  return [check("body", constants.COMMENT_BODY_EMPTY).not().isEmpty()];
};

// Export
export default { login, register, createPost, createCommunity, createComment };
