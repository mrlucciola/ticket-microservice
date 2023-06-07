import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import { ReqValidationError } from "../errors/reqValidationError";

const router = Router();

router.post(
  "/users/login",
  body("email").isEmail().withMessage("Please use valid email."),
  body("password").trim().notEmpty().withMessage("Please use valid password."),
  (req: Request, res: Response, next) => {
    const errors = validationResult(req);

    // handle validation errors
    if (!errors.isEmpty()) {
      next(new ReqValidationError(res, errors.array()));
    } else {
      res.status(200).send(`Req login OK`);
    }
  }
);

export { router as routerLogin };
