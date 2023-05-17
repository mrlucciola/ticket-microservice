import { Response } from "express";
import { EventError } from ".";

export class CustomError extends EventError {
  constructor(res: Response, public message: string, public status = 400) {
    super(res);

    // for extending builtin
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
