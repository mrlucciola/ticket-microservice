import mongoose from "mongoose";
// interface, describes props for new user
interface UserAttrs {
  email: string;
  password: string;
}

// create schema
const userSchema = new mongoose.Schema<UserAttrs>({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const UserModel = mongoose.model("User", userSchema);

export const buildUser = (attrs: UserAttrs) => new UserModel(attrs);
