import { Response, Router } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
// local
import { User } from "../models/user";
import { validateRequest } from "../middlewares/validateRequest";
import { ReqLogin } from "../interfaces/requests";
import { UserNotFoundError } from "../errors/userNotFoundError";
import { Password } from "../interfaces/password";

const router = Router();

router.post(
  "/users/login",
  body("email").isEmail().withMessage("Please use valid email."),
  body("password").trim().notEmpty().withMessage("Please use valid password."),
  validateRequest,
  async (req: ReqLogin, res: Response, next) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    // handle error: no user
    if (!existingUser) {
      // @todo rename to InvalidCredentialsError
      next(new UserNotFoundError(res));
    } else if (!(await Password.compare(existingUser.password, password))) {
      // @todo rename to InvalidCredentialsError
      next(new UserNotFoundError(res));
    } else {
      // generate jwt
      const jwtUser: string = jwt.sign(
        {
          id: existingUser.id,
          email: existingUser.email,
        },
        process.env.JWT_KEY!
      );
      // store jwt on session
      req.session = { jwt: jwtUser };
      res.status(200).send(existingUser);
    }
  }
);

export { router as routerLogin };
