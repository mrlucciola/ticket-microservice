import { Router } from "express";
// local
import { routerCurrentUser } from "./currentUser";
import { routerRegister } from "./register";
import { routerLogout } from "./logout";
import { routerLogin } from "./login";

const router = Router();

router.use(
  "/api",
  routerCurrentUser,
  routerRegister,
  routerLogout,
  routerLogin
);

export default router;
