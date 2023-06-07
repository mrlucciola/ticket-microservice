import { Response } from "express";
import { EventError } from ".";

export class UserNotFoundError extends EventError {
  reason = "User not found";
  status: number = 500;

  constructor(res: Response) {
    super(res);

    this.message = this.reason;

    // for extending builtin
    Object.setPrototypeOf(this, UserNotFoundError.prototype);
  }
}
