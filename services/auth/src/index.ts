import express from "express";
import bodyParser from "body-parser";
// local
import routes from "./routes";
import { errorHandler } from "./middlewares/errorHandler";
import { NotFoundError } from "./errors/notFoundError";
import mongoose from "mongoose";

// constants
export const serviceName = "auth";
export const PORT_AUTH = 8080;

// init
const app = express();

// add middlewares
app.use(bodyParser.json());

// set routes
app.use(routes);
app.all("*", async (_req, res, next) => {
  next(new NotFoundError(res));
});

// set error middleware
app.use(errorHandler);

const start = async () => {
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
