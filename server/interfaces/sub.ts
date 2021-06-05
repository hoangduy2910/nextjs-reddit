import { Document, Types } from "mongoose";

interface ISub extends Document {
  name: string;
  title: string;
  description: string;
  image: string;
  banner: string;
  user: Types.ObjectId;
  posts: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export default ISub;
