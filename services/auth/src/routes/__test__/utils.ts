import request from "supertest";
// local
import { app } from "../../app";
import { email as defaultEmail, pw } from "./defaults";

export const registerUser = async (
  email: string = defaultEmail.valid,
  password: string = pw.valid,
  responseCode: number = 201
) => {
  const resRegister = await request(app)
    .post("/api/users/register")
    .send({ email, password })
    .expect(responseCode);

  const cookie = resRegister.get("Set-Cookie");

  return cookie;
};
