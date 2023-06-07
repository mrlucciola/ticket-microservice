import { Response } from "express";
import { EventError } from ".";

export class NotFoundError extends EventError {
  status = 404;
  message = "Not found";

  constructor(res: Response) {
    super(res);
  }
}
