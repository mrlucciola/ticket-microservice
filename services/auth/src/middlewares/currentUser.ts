import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

/** Data type of JWT session cookie returned from a user request
 */
interface UserPayload {
  id: string;
  email: string;
}

// modify Express type definition for `Request`
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

/**
 * Checks if user is logged in
 * Extract info from jwt, set on `currentUser` property
 * This does NOT handle errors
 */
export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // handle `InvalidSessionError` with next middleware/route handler
  if (req.session?.jwt) {
    try {
      // get jwt payload
      const payload = jwt.verify(
        req.session.jwt,
        process.env.JWT_KEY!
      ) as UserPayload;
      req.currentUser = payload;
    } catch (err) {}
  }

  // call next middleware in all cases
  next();
};
