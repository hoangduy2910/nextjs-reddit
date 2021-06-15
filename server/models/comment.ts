import { model, Schema, Types } from "mongoose";

import IUser from "../interfaces/user";
import IVote from "../interfaces/vote";
import IComment from "../interfaces/comment";

const commentSchema = new Schema<IComment>(
  {
    identifier: { type: String, require: true },
    body: { type: String, require: true },
    user: { type: Types.ObjectId, require: true, ref: "User" },
    post: { type: Types.ObjectId, require: true, ref: "Post" },
    votes: [{ type: Types.ObjectId, require: true, ref: "Vote" }],
  },
  {
    timestamps: true,
    toObject: { getters: true },
  }
);

commentSchema.virtual("userVote").get(function (user: IUser) {
  const index = this.votes.findIndex((vote: IVote) => vote.user == user.id);
  if (index > -1) return this.votes[index].value;
  return 0;
});

export default model<IComment>("Comment", commentSchema);
