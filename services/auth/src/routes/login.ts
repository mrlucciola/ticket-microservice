import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validateRequest";

const router = Router();

router.post(
  "/users/login",
  body("email").isEmail().withMessage("Please use valid email."),
  body("password").trim().notEmpty().withMessage("Please use valid password."),
  validateRequest,
  (_req: Request, res: Response, _next) => {
    res.status(200).send(`Req login OK`);
  }
);

export { router as routerLogin };
