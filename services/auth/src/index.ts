import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
// local
import routes from "./routes";
import { errorHandler } from "./middlewares/errorHandler";
import { NotFoundError } from "./errors/notFoundError";
import { CustomError } from "./errors/customError";

// constants
export const serviceName = "auth";
export const PORT_AUTH = 8080;

// init
const app = express();
// allow https k8s nginx proxy
app.set("trust proxy", true);

// add middlewares
app.use(bodyParser.json());
app.use(
  cookieSession({
    // disable encryption - we dont use encryption
    signed: false,
    // require that cookies are used over https
    secure: true,
  })
);

// set routes
app.use(routes);
app.all("*", async (_req, res, next) => {
  next(new NotFoundError(res));
});

// set error middleware
app.use(errorHandler);

const start = async () => {
  if (!process.env.JWT_KEY)
    throw new Error(`"JWD_KEY" env var not set for service: ${serviceName}`);

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
