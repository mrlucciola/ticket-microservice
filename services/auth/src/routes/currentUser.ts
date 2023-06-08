import { Request, Response, Router } from "express";

const router = Router();

router.route("/users/currentuser").get((req: Request, res: Response, next) => {
  if (!req.session?.jwt) {
    res.send({ currentUser: null });
  }

  res.status(200).send("Req to currentuser OK");

  next();
});

export { router as routerCurrentUser };
