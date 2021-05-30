const mongoose = require("mongoose");

const Post = new mongoose.Schema({
  title: { type: String, require: true },
  slug: { type: String, require: true },
  body: { type: String, require: true },
  subName: { type: String, require: true },
  createdAt: { type: Date, require: true },
  updatedAt: { type: Date, require: false },
  user: { type: mongoose.Types.ObjectId, require: true },
});

module.exports = mongoose.model("Posts", Post);
