import { Request, Response, Router } from "express";

const router = Router();

router.post("/users/logout", (req: Request, res: Response, _next) => {
  // delete jwt - set browser's cookie session to null
  req.session = null;

  res.status(200).send({});
});

export { router as routerLogout };
