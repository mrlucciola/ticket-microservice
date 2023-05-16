import { NextFunction, Request, Response } from "express";
import { EventError } from "../errors";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof EventError) err.sendRes();
  else {
    console.log("unhandled error:", err);
    res.status(400).send({ msg: err.message });
  }
};
