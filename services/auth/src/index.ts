import mongoose from "mongoose";
import { app } from "./app";

// constants
export const serviceName = "auth";
export const PORT_AUTH = 8080;

const start = async () => {
  if (!process.env.JWT_KEY)
    throw new Error(`"JWT_KEY" env var not set for service: ${serviceName}`);

  // init connection with db
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("Connected to mongodb!");
  } catch (err) {
    console.error(err);
  }

  // start server
  app.listen(PORT_AUTH, () => {
    console.log(`Auth service - http://localhost:${PORT_AUTH}`);
  });
};

start();
