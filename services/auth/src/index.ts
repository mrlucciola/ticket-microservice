import express from "express";
import bodyParser from "body-parser";
// local
import routes from "./routes";
import { errorHandler } from "./middlewares/errorHandler";

// constants
export const serviceName = "auth";
export const PORT_AUTH = 8080;

// init
const app = express();

// add middlewares
app.use(bodyParser.json());
app.use(errorHandler);

// set routes
app.use(routes);

// start server
app.listen(PORT_AUTH, () => {
  console.log(`Server listening at http://localhost:${PORT_AUTH}`);
});
