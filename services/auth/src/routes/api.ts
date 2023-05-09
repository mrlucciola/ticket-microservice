import { Router } from "express";

const router = Router();

router.route("/user/:currentUser").get((req, _res, next) => {
  const { currentUser } = req.params;
  console.log("current user is:", currentUser);

  next();
});

export default router;
