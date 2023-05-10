import { Router } from "express";

const router = Router();

router.route("/users/currentuser").get((_req, res, next) => {
  console.log("req current user");

  res.status(200).send("Req to currentuser OK");

  next();
});

export { router as routerUser };
