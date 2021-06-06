import { Document, Types } from "mongoose";

interface ICommunity extends Document {
  name: string;
  title: string;
  description: string;
  image: string;
  banner: string;
  createdAt: Date;
  updatedAt: Date;
  user: Types.ObjectId;
  posts: Types.ObjectId[];
}

export default ICommunity;
