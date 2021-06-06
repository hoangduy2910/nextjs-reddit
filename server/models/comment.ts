import { model, Schema, Types } from "mongoose";
import IComment from "../interfaces/comment";

const commentSchema = new Schema<IComment>(
  {
    identifier: { type: String, require: true },
    body: { type: String, require: true },
    user: { type: Types.ObjectId, require: true, ref: "Users" },
    post: { type: Types.ObjectId, require: true, ref: "Posts" },
  },
  {
    timestamps: true,
    toObject: { getters: true },
  }
);

export default model<IComment>("Comments", commentSchema);
