import { Request } from "express";
// local
import { UserAttrs } from "../models/user";

export type ReqLogin = Request<{}, {}, UserAttrs>;
