import { model, Schema, Types } from "mongoose";
import IPost from "../interfaces/post";

const postSchema = new Schema(
  {
    identifier: { type: String, require: true },
    title: { type: String, require: true },
    slug: { type: String, require: true },
    body: { type: String, require: false },
    subName: { type: String, require: true },
    user: { type: Types.ObjectId, require: true, ref: "User" },
  },
  { timestamps: true, toObject: { getters: true } }
);

export default model<IPost>("Post", postSchema);
