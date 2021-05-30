const cookie = require("cookie");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

const constants = require("../constants/constants");
const User = require("../models/user");

const getUserById = async (req, res, next) => {
  const id = req.params.id;

  // Fetch User
  let user;
  try {
    user = await User.findById(id);
  } catch (err) {
    console.log("[Error]: Fetch User");
    return res.json({ success: false, error: constants.FAIL });
  }

  if (!user) {
    return res.json({ success: false, error: constants.USER_NOT_EXIST });
  }

  return res.json({ success: true, data: user.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  // Validate Input
  if (!email || !password) {
    return res.json({
      success: false,
      error: constants.EMAIL_PASSWORD_EMPTY,
    });
  }

  // Validate Email
  let user;
  try {
    user = await User.findOne({ email });
  } catch (err) {
    console.log("[Error]: Validate Email");
    return res.json({ success: false, error: constants.FAIL });
  }

  if (!user) {
    return res.json({ success: false, error: constants.USER_NOT_EXIST });
  }

  // Vaidate Password
  let passwordIsValid;
  try {
    passwordIsValid = await bcrypt.compare(password, user.password);
  } catch (err) {
    console.log("[Error]: Validate Password");
    return res.json({ success: false, error: constants.FAIL });
  }

  if (!passwordIsValid) {
    return res.json({ success: false, error: constants.PASSWORD_INVALID });
  }

  // Generate Token
  const token = jsonwebtoken.sign({ email }, process.env.SECRET_KEY);
  res.set(
    "Set-Cookie",
    cookie.serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600,
      path: "/",
    })
  );

  return res.json({
    success: true,
    data: user.toObject({ getters: true }),
  });
};

const logout = (req, res, next) => {
  res.set(
    "Set-Cookie",
    cookie.serialize("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: new Date(0),
      path: "/",
    })
  );
  return res.json({ success: true });
};

const createUser = async (req, res, next) => {
  const { email, userName, password, confirmPassword } = req.body;

  // Validate Password
  if (password !== confirmPassword) {
    return res.json({ success: false, error: constants.PASSWORD_NOT_MATCH });
  }

  // Validate Email
  let existedEmail;
  try {
    existedEmail = await User.findOne({ email });
  } catch (err) {
    console.log("[Error]: Validate Email");
    return res.json({ success: false, error: constants.FAIL });
  }

  if (existedEmail) {
    return res.json({ success: false, error: constants.EMAIL_EXIST });
  }

  // Validate User Name
  let existedUserName;
  try {
    existedUserName = await User.findOne({ userName });
  } catch (err) {
    console.log("[Error]: Validate User Name");
    return res.json({ success: false, error: constants.FAIL });
  }

  if (existedUserName) {
    return res.json({ success: false, error: constants.USERNAME_EXIST });
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

const updateUser = async (req, res, next) => {};

exports.login = login;
exports.getUserById = getUserById;
exports.createUser = createUser;
exports.updateUser = updateUser;
