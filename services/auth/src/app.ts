import express from "express";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
// local
import routes from "./routes";
import { errorHandler } from "./middlewares/errorHandler";
import { NotFoundError } from "./errors/notFoundError";

// init
const app = express();

// config express
// config: allow https k8s nginx proxy
app.set("trust proxy", true);

// add middlewares
app.use(bodyParser.json());
app.use(
  cookieSession({
    // disable encryption - we dont use encryption
    signed: false,
    // require that cookies are used over https
    secure: process.env.NODE_ENV !== "test",
  })
);

// set routes
app.use(routes);
app.all("*", async (_req, res, next) => {
  next(new NotFoundError(res));
});

// set error middleware
app.use(errorHandler);

export { app };
