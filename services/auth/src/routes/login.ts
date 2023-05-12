import { Router } from "express";

const router = Router();

router.route("/users/login").post((_req, res, _next) => {
  res.status(200).send(`Req login OK`);
});

export { router as routerLogin };
