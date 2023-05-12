import { ValidationError } from "express-validator";

export class ReqValidationError extends Error {
  constructor(public errors: ValidationError[]) {
    super();

    // for extending builtin
    Object.setPrototypeOf(this, ReqValidationError.prototype);
  }
}
