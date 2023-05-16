import { Response } from "express";
import { ValidationError } from "express-validator";
import { EventError } from ".";

export class ReqValidationError extends EventError {
  status: number = 400;

  constructor(res: Response, valErrors: ValidationError[]) {
    super(res);

    // filter + map errors
    const formattedErrors = [];
    for (let idx = 0; idx < valErrors.length; idx++) {
      const subErr = valErrors[idx];
      if (subErr.type === "field")
        formattedErrors.push({ message: subErr.msg, field: subErr.path });
    }

    this.message = JSON.stringify(formattedErrors, null, 2);

    // for extending builtin
    Object.setPrototypeOf(this, ReqValidationError.prototype);
  }
}
