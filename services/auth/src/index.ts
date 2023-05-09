import express from "express";
import bodyParser from "body-parser";
// local
import routesApi from "./routes/api";

// constants
export const serviceName = "auth";
export const PORT_AUTH = 8080;

// init
const app = express();

// add middlewares
app.use(bodyParser.json());

// set routes
app.use("/api", routesApi);

// start server
app.listen(PORT_AUTH, () => {
  console.log(`Server listening at http://localhost:${PORT_AUTH}`);
});
