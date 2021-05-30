import { Document, Types } from "mongoose";

interface IPost extends Document {
  identifier: string;
  title: string;
  slug: string;
  body: string;
  subName: string;
  createdAt: Date;
  updatedAt: Date;
  user: Types.ObjectId;
}

export default IPost;
