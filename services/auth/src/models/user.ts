import mongoose from "mongoose";
import { Password } from "../interfaces/password";
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

userSchema.statics.build = (attrs: UserAttrs) => new User(attrs);
userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    // get password from the document
    const hashed = await Password.toHash(this.get("password"));
    // update the pwd
    this.set("password", hashed);
    // close
    done();
  }
});

export const User = mongoose.model<UserDoc, UserModel>("User", userSchema);
