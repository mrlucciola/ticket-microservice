import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
// local
import { ReqValidationError } from "../errors/reqValidationError";
import { DatabaseConnectionError } from "../errors/databaseConnectionError";
import { User } from "../models/user";
import { CustomError } from "../errors/customError";

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

    const existingUser = await User.find({ email: { $eq: email } });

    // @todo create a custom error type for existing user
    if (existingUser.length > 0) {
      next(new CustomError(res, `user "${email}" already exists`));
    } else {
      try {
        // create user instance
        const user = User.build({ email, password });
        // save to database
        await user.save();

        // generate jwt
        const jwtUser: string = jwt.sign(
          {
            id: user.id,
            email: user.email,
          },
          "asdfa"
        );
        // store jwt on session
        req.session = { jwt: jwtUser };

        res.status(201).send(user);
      } catch (error) {
        // @todo add custom error
        return next(error);
      }
    }
  }
);

export { router as routerRegister };
