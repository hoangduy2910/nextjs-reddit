import { Document, Types } from "mongoose";

interface IVote extends Document {
  object: Types.ObjectId;
  objectType: "Post" | "Comment";
  user: Types.ObjectId;
  value: number;
  createdAt: Date;
  updatedAt: Date;
}

export default IVote;
