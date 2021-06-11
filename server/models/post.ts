import { model, Schema, Types } from "mongoose";

import IPost from "../interfaces/post";
import IVote from "../interfaces/vote";

const postSchema = new Schema<IPost>(
  {
    identifier: { type: String, require: true },
    title: { type: String, require: true },
    slug: { type: String, require: true },
    body: { type: String, require: true },
    community: { type: Types.ObjectId, require: true, ref: "Community" },
    user: { type: Types.ObjectId, require: true, ref: "User" },
    votes: [{ type: Types.ObjectId, require: true, ref: "Vote" }],
  },
  { timestamps: true, toObject: { getters: true } }
);

// Vitural Fields
postSchema.virtual("totalVote").get(function () {
  return this.votes.reduce(
    (total: number, vote: IVote) => total + (vote.value || 0),
    0
  );
});

postSchema.virtual("url").get(function () {
  return `${this.community.name}/${this.identifier}/${this.slug}`;
});

export default model<IPost>("Post", postSchema);
