import { Document, Types } from "mongoose";

interface ICommunity extends Document {
  identifier: string;
  title: string;
  slug: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  community: Types.ObjectId;
  user: Types.ObjectId;
}

export default ICommunity;
