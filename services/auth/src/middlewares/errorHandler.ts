import { NextFunction, Request, Response } from "express";
import { ReqValidationError } from "../errors/reqValidationError";
import { DatabaseConnectionError } from "../errors/databaseConnectionError";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log("handling error");

  if (err instanceof ReqValidationError) {
    console.log("Req val error occured");

    // filter + map errors
    const formattedErrors = [];
    for (let idx = 0; idx < err.errors.length; idx++) {
      const subErr = err.errors[idx];
      if (subErr.type === "field")
        formattedErrors.push({ message: subErr.msg, field: subErr.path });
    }
    res.status(400).send({ errors: formattedErrors });
  } else if (err instanceof DatabaseConnectionError) {
    console.log("DB error occured");
    res.status(400).send({ msg: err.message });
  } else console.log("unhandled error:", err);
};
