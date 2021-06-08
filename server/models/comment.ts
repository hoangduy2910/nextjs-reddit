import { model, Schema, Types } from "mongoose";
import IComment from "../interfaces/comment";

const commentSchema = new Schema<IComment>(
  {
    identifier: { type: String, require: true },
    body: { type: String, require: true },
    user: { type: Types.ObjectId, require: true, ref: "User" },
    post: { type: Types.ObjectId, require: true, ref: "Post" },
  },
  {
    timestamps: true,
    toObject: { getters: true },
  }
);

export default model<IComment>("Comment", commentSchema);
