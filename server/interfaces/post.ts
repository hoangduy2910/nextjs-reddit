import { Document, Types } from "mongoose";

interface IPost extends Document {
  identifier: string;
  title: string;
  slug: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  community: Types.ObjectId;
  user: Types.ObjectId;
  votes: Types.ObjectId[];
  comments: Types.ObjectId[];
  totalComment: number;
  voteScore: number;
  url: string;
  getUserVote: Function;
}

export default IPost;
