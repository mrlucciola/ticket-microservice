import { Response } from "express";
import { EventError } from ".";

export class DatabaseConnectionError extends EventError {
  reason = "Error connecting to database";
  status: number = 500;

  constructor(res: Response) {
    super(res);

    this.message = this.reason;

    // for extending builtin
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
}
