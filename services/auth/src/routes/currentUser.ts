import { Request, Response, Router } from "express";
import { currentUser } from "../middlewares/currentUser";

const router = Router();

router.get("/users/currentuser", currentUser, (req: Request, res: Response) => {
  res.status(200).send({ currentUser: req.currentUser || null });
});

export { router as routerCurrentUser };
