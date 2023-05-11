import { Router } from "express";

const router = Router();

router.route("/users/login").get((req, res, next) => {
  const { email, password } = req.body;
  console.log("req login");

  res.status(200).send("Req login OK");

  next();
});

export { router as routerLogin };
