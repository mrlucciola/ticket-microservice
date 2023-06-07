import { Request, Response, Router } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
// local
import { CustomError } from "../errors/customError";
import { User } from "../models/user";
import { validateRequest } from "../middlewares/validateRequest";

const router = Router();

router.post(
  "/users/register",
  body("email").isEmail().withMessage("Please use valid email."),
  body("password")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Please use valid password length (min: 4, max: 20)."),
  validateRequest,
  async (req: Request, res: Response, next) => {
    const { email, password } = req.body;

    // handle error: user already registered/exists
    const existingUser = await User.find({ email: { $eq: email } });
    if (existingUser.length > 0)
      return next(new CustomError(res, `user "${email}" already exists`));

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
        process.env.JWT_KEY!
      );
      // store jwt on session
      req.session = { jwt: jwtUser };

      res.status(201).send(user);
    } catch (error) {
      // @todo add custom error
      return next(error);
    }
  }
);

export { router as routerRegister };
