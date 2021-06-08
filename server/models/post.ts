import { model, Schema, Types } from "mongoose";
import IPost from "../interfaces/post";

const postSchema = new Schema<IPost>(
  {
    identifier: { type: String, require: true },
    title: { type: String, require: true },
    slug: { type: String, require: true },
    body: { type: String, require: true },
    community: { type: Types.ObjectId, require: true, ref: "Community" },
    user: { type: Types.ObjectId, require: true, ref: "User" },
  },
  { timestamps: true, toObject: { getters: true } }
);

export default model<IPost>("Post", postSchema);
