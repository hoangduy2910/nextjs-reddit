import { check } from "express-validator";
import constants from "../constants/constants";

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

const validate = {
  register,
  login,
};

export default validate;
