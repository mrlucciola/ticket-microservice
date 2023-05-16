import express from "express";
import bodyParser from "body-parser";
// local
import routes from "./routes";
import { errorHandler } from "./middlewares/errorHandler";
import { NotFoundError } from "./errors/notFoundError";

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

// start server
app.listen(PORT_AUTH, () => {
  console.log(`Server listening at http://localhost:${PORT_AUTH}`);
});
