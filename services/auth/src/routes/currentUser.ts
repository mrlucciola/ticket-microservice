import { Request, Response, Router } from "express";
import { currentUser } from "../middlewares/currentUser";
import { requireAuth } from "../middlewares/requireAuth";

const router = Router();

router.get(
  "/users/currentuser",
  currentUser,
  requireAuth,
  (req: Request, res: Response) => {
    res.status(200).send({ currentUser: req.currentUser || null });
  }
);

export { router as routerCurrentUser };
