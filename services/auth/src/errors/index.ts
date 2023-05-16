import { Response } from "express";

/**
 * Error type for all errors used within the system of microservices
 *  for Ticketing platform
 */
export class EventError extends Error {
  reason: string = "Unknown error";
  res?: Response;

  constructor(res?: Response) {
    super();

    this.res = res;

    // for extending builtin
    Object.setPrototypeOf(this, EventError.prototype);
  }

  sendRes = (status: number = 400) => {
    this.res?.status(400).send({ message: this.message });
  };
}
