const mongoose = require("mongoose");

const User = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  createdDate: { type: Date, required: false },
  updatedDate: { type: Date, required: false },
  image: { type: String, required: true },
  posts: [{ type: mongoose.Types.ObjectId, required: true, ref: "Posts" }],
});

module.exports = mongoose.model("User", User);
