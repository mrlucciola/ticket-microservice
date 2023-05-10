import { Router } from "express";
// local
import { routerUser } from "./users";

const router = Router();

router.use("/api", routerUser);

export default router;
