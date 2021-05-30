const bcrypt = require("bcrypt");
// const jsonwebtoken = require("jsonwebtoken");

const constants = require("../constants/constants");
const User = require("../models/user");

const getById = async (req, res, next) => {
  const id = req.params.id;

  // Fetch User
  let user;
  try {
    user = await User.findById(id);
    if (!user) {
      return res.json({ success: false, error: constants.USER_NOT_EXIST });
    }
  } catch (err) {
    console.log("[Error]: Fetch User");
    return res.json({ success: false, error: constants.FAIL });
  }

  return res.json({ success: true, data: user.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  // Validate Email
  let user;
  try {
    user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, error: constants.USER_NOT_EXIST });
    }
  } catch (err) {
    console.log("[[Error]]: Validate Email");
    return res.json({ success: false, error: constants.FAIL });
  }

  // Vaidate Password
  try {
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.json({ success: false, error: constants.PASSWORD_INVALID });
    }
  } catch (err) {
    console.log("[[Error]]: Validate Password");
    return res.json({ success: false, error: constants.FAIL });
  }

  return res.json({ success: true, data: user.toObject({ getters: true }) });
};

const create = async (req, res, next) => {
  const { email, userName, password, confirmPassword } = req.body;

  // Validate Password
  if (password !== confirmPassword) {
    return res.json({ success: false, error: constants.PASSWORD_NOT_MATCH });
  }

  // Validate Email
  try {
    const existedEmail = await User.findOne({ email });
    if (existedEmail) {
      return res.json({ success: false, error: constants.EMAIL_EXIST });
    }
  } catch (err) {
    console.log("[Error]: Validate Email");
    return res.json({ success: false, error: constants.FAIL });
  }

  // Validate User Name
  try {
    const existedUserName = await User.findOne({ userName });
    if (existedUserName) {
      return res.json({ success: false, error: constants.USERNAME_EXIST });
    }
  } catch (err) {
    console.log("[Error]: Validate User Name");
    return res.json({ success: false, error: constants.FAIL });
  }

  // Create Hashed Password
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (error) {
    console.log("[Error]: Create Hashed Password");
    return res.json({ success: false, error: constants.FAIL });
  }

  // Create New User
  const newUser = new User({
    email,
    userName,
    password: hashedPassword,
    firstName: null,
    lastName: null,
    createdDate: new Date(),
    updatedDate: null,
    image: "/uploads/images/user-default.png",
  });

  try {
    await newUser.save();
  } catch (err) {
    console.log("[Error]: Create User");
    return res.json({ success: false, error: constants.FAIL });
  }

  return res.json({ success: true });
};

const update = async (req, res, next) => {};

exports.getById = getById;
exports.login = login;
exports.create = create;
exports.update = update;
