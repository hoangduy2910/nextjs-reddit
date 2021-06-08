import { model, Schema, Types } from "mongoose";
import ICommunity from "../interfaces/community";

const communitySchema = new Schema<ICommunity>(
  {
    name: { type: String, require: true },
    title: { type: String, require: true },
    description: { type: String, require: false },
    image: { type: String, require: false },
    banner: { type: String, require: false },
    user: { type: Types.ObjectId, require: true, ref: "User" },
    posts: [{ type: Types.ObjectId, require: true, ref: "Post" }],
  },
  {
    timestamps: true,
    toObject: { getters: true },
  }
);

export default model<ICommunity>("Community", communitySchema);
