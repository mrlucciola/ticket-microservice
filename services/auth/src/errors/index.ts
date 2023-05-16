import { Response } from "express";

/**
 * Error type for all errors used within the system of microservices
 *  for Ticketing platform
 */
export abstract class EventError extends Error {
  reason: string = "Unknown error";
  abstract status: number;

  constructor(public res: Response) {
    super();

    // for extending builtin
    Object.setPrototypeOf(this, EventError.prototype);
  }

  sendRes = () => {
    this.res.status(this.status).send({ msg: this.message });
  };
}
