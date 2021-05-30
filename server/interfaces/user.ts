import { Document, Types } from "mongoose";

interface IUser extends Document {
  userName: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  image: string;
  createdDate: Date;
  updatedDate: Date;
  posts: Types.ObjectId[];
}

export default IUser;
