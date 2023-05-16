import { ValidationError } from "express-validator";
import { EventError } from ".";

export class ReqValidationError extends EventError {
  constructor(valErrors: ValidationError[]) {
    super();

    // filter + map errors
    const formattedErrors = [];
    for (let idx = 0; idx < valErrors.length; idx++) {
      const subErr = valErrors[idx];
      console.log("\n\n\nsub error:\n", subErr, "\n\n");
      if (subErr.type === "field")
        formattedErrors.push({ message: subErr.msg, field: subErr.path });
    }

    this.message = JSON.stringify(formattedErrors, null, 2);
  }
}
