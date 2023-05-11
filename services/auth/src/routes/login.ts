import { Request, Response, Router } from "express";
import { body } from "express-validator";

const router = Router();

router
  .route("/users/login")
  .get(
    body("email").isEmail().withMessage("Please use valid email."),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Please use valid password length (min: 4, max: 20)."),
    (req: Request, res: Response, next) => {
      const { email, password } = req.body;
      console.log("req login");

      res
        .status(200)
        .send(`Req login OK: {email: ${email}, password: ${password}}`);

      next();
    }
  );

export { router as routerLogin };
