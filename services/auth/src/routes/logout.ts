import { Router } from "express";

const router = Router();

router.route("/users/logout").get((_req, res, next) => {
  console.log("req logout user");

  res.status(200).send("Req to logout OK");

  next();
});

export { router as routerLogout };
