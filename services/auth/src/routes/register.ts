import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";

const router = Router();

router
  .route("/users/register")
  .post(
    body("email").isEmail().withMessage("Please use valid email."),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Please use valid password length (min: 4, max: 20)."),
    (req: Request, res: Response, _next) => {
      // validate input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).send(errors.array());
      } else {
        const { email, password } = req.body;

        res
          .status(200)
          .send(`Req register OK: {email: ${email}, password: ${password}}`);
      }
    }
  );

export { router as routerRegister };
