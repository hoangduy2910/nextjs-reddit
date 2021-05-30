const mongoose = require("mongoose");

const user = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  createdDate: { type: Date, required: false },
  updatedDate: { type: Date, required: false },
  image: { type: String, required: true },
});

module.exports = mongoose.model("User", user);
