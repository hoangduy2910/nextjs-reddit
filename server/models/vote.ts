import { model, Schema, Types } from "mongoose";
import IVote from "../interfaces/vote";

const voteSchema = new Schema(
  {
    object: { type: Types.ObjectId, require: true, refPath: "objectType" },
    objectType: { type: String, require: true, enum: ["Post", "Comment"] },
    user: { type: Types.ObjectId, require: true, ref: "User" },
    value: { type: Number, require: true },
  },
  {
    timestamps: true,
    toObject: {
      getters: true,
    },
  }
);

export default model<IVote>("Vote", voteSchema);
