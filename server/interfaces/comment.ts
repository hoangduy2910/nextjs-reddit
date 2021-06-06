import { Document, Types } from "mongoose";

interface IComment extends Document {
  identifier: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  post: Types.ObjectId;
  user: Types.ObjectId;
}

export default IComment;
