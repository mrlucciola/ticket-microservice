import { Router } from "express";

const router = Router();

router.route("/users/register").get((_req, res, next) => {
  console.log("req register user");

  res.status(200).send("Req to register OK");

  next();
});

export { router as routerRegister };
