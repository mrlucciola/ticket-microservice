import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ReqValidationError } from "../errors/reqValidationError";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) throw new ReqValidationError(res, errors.array());

  next();
};
