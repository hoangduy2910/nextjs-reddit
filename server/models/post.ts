import { model, Schema, Types } from "mongoose";

import IUser from "../interfaces/user";
import IVote from "../interfaces/vote";
import IPost from "../interfaces/post";

const postSchema = new Schema<IPost>(
  {
    identifier: { type: String, require: true },
    title: { type: String, require: true },
    slug: { type: String, require: true },
    body: { type: String, require: true },
    community: { type: Types.ObjectId, require: true, ref: "Community" },
    user: { type: Types.ObjectId, require: true, ref: "User" },
    comments: [{ type: Types.ObjectId, require: true, ref: "Comment" }],
    votes: [{ type: Types.ObjectId, require: true, ref: "Vote" }],
  },
  { timestamps: true, toObject: { getters: true } }
);

// Vitural Fields
postSchema.virtual("totalComment").get(function () {
  return this.comments.length;
});

postSchema.virtual("voteScore").get(function () {
  return this.votes.reduce(
    (total: number, vote: IVote) => total + (vote.value || 0),
    0
  );
});

postSchema.virtual("url").get(function () {
  return `/${this.community.name}/${this.identifier}/${this.slug}`;
});

// Methods
postSchema.methods.getUserVote = function (user, votes) {
  if (!user) return 0;
  const voteIndex = votes.findIndex((vote: IVote) => vote.user == user.id);
  return voteIndex > -1 ? votes[voteIndex].value : 0;
};

postSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.comments;
  delete obj.votes;
  return obj;
};

export default model<IPost>("Post", postSchema);
