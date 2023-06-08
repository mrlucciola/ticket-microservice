import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";

const router = Router();

router.get("/users/currentuser", (req: Request, res: Response, next) => {
  const jwtSessionToken = req.session?.jwt;

  if (!jwtSessionToken) {
    // handle error: if jwt doesnt exist
    res.send({ currentUser: null });
  } else {
    // handle error: check if jwt is valid
    try {
      const payload = jwt.verify(jwtSessionToken, process.env.JWT_KEY!);

      res.status(200).send({ currentUser: payload });
    } catch (err) {
      res.send({ currentUser: null });
    }
  }

  // @todo - next() is causing an error
  // next();
});

export { router as routerCurrentUser };
