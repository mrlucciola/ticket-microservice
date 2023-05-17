import mongoose from "mongoose";
// interface, describes props for new user
interface UserAttrs {
  email: string;
  password: string;
}
interface UserDoc extends mongoose.Document, UserAttrs {}
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
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

export const User = mongoose.model<UserDoc, UserModel>("User", userSchema);
userSchema.statics.build = (attrs: UserAttrs) => new User(attrs);
export const buildUser = (attrs: UserAttrs) => new User(attrs);
