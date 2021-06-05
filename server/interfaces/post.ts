import { Document, Types } from "mongoose";

interface IPost extends Document {
  identifier: string;
  title: string;
  slug: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  sub: Types.ObjectId;
  user: Types.ObjectId;
}

export default IPost;
