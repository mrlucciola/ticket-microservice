import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../errors/UnauthorizedError";

/**
 * This middleware will always be called with currentUser.
 */
export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) throw new UnauthorizedError(res);
  else next();
};
