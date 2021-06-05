import { model, Schema, Types } from "mongoose";
import IPost from "../interfaces/post";

const postSchema = new Schema<IPost>(
  {
    identifier: { type: String, require: true },
    title: { type: String, require: true },
    slug: { type: String, require: true },
    body: { type: String, require: true },
    sub: { type: Types.ObjectId, require: true },
    user: { type: Types.ObjectId, require: true, ref: "Users" },
  },
  { timestamps: true, toObject: { getters: true } }
);

export default model<IPost>("Posts", postSchema);
