import { Response } from "express";
import { EventError } from ".";

export class UnauthorizedError extends EventError {
  reason = "Unauthorized";
  status: number = 401;

  constructor(res: Response) {
    super(res);

    this.message = this.reason;

    // for extending builtin
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}
