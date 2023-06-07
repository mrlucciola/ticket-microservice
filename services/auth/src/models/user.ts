import mongoose from "mongoose";
import { Password } from "../interfaces/password";

// interface, describes props for new user
export interface UserAttrs {
  email: string;
  password: string;
}
interface UserDoc extends mongoose.Document, UserAttrs {}
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// create schema
const userSchema = new mongoose.Schema<UserAttrs>(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(_doc, ret) {
        // map _id to id for response data
        ret.id = ret._id;
        delete ret._id;
        // remove password from response data
        delete ret.password;
        // remove version key from response data
        delete ret.__v;
      },
    },
  }
);

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
