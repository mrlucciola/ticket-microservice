import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import { ReqValidationError } from "../errors/reqValidationError";
import { DatabaseConnectionError } from "../errors/databaseConnectionError";
import { User } from "../models/user";

const router = Router();

router.post(
  "/users/register",
  body("email").isEmail().withMessage("Please use valid email."),
  body("password")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Please use valid password length (min: 4, max: 20)."),
  async (req: Request, res: Response, next) => {
    // validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // this `return` incurs overhead
      return next(new ReqValidationError(res, errors.array()));
    }

    const { email, password } = req.body;

    const existingUser = await User.findOne();

    // @todo `return` incurs overhead
    // @todo create a custom error type for existing user
    if (existingUser) return next(new Error(`user "${email}" already exists`));

    try {
      // create user instance
      const user = User.build({ email, password });
      // save to database
      await user.save();
      res.status(201).send(user);
    } catch (error) {
      // @todo add custom error
      return next(error);
    }

    // @todo handle db connection error
    next(new DatabaseConnectionError(res));

    // res
    //   .status(200)
    //   .send(`Req register OK: {email: ${email}, password: ${password}}`);
  }
);

export { router as routerRegister };
