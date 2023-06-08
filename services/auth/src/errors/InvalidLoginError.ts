import { Response } from "express";
import { EventError } from ".";

export class InvalidLoginError extends EventError {
  reason = "Invalid login credentials";
  status: number = 400;

  constructor(res: Response) {
    super(res);

    this.message = this.reason;

    // for extending builtin
    Object.setPrototypeOf(this, InvalidLoginError.prototype);
  }
}
