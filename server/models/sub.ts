import { model, Schema, Types } from "mongoose";
import ISub from "../interfaces/sub";

const subSchema = new Schema<ISub>(
  {
    name: { type: String, require: true },
    title: { type: String, require: true },
    description: { type: String, require: false },
    image: { type: String, require: false },
    banner: { type: String, require: false },
    user: { type: Types.ObjectId, require: true, ref: "Users" },
    posts: [{ type: Types.ObjectId, require: true, ref: "Posts" }],
  },
  {
    timestamps: true,
    toObject: { getters: true },
  }
);

export default model<ISub>("Subs", subSchema);
