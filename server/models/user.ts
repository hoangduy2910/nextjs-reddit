import { model, Schema, Types } from "mongoose";
import IUser from "../interfaces/user";

const User = new Schema<IUser>(
  {
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    image: { type: String, required: true },
    posts: [{ type: Types.ObjectId, required: true, ref: "Posts" }],
  },
  { timestamps: true, toObject: { getters: true } }
);

export default model<IUser>("Users", User);
