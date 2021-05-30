const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.json({ success: false, error: "Unauthentication !!!" });
  }

  const isValidToken = jwt.verify(token, process.env.SECRET_KEY);
  if (!isValidToken) {
    return res.json({ success: false, error: "Invalid Token !!!" });
  }

  next();
};

module.exports = authentication;