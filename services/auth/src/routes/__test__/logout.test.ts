import request from "supertest";
import { app } from "../../app";
// local
import { registerUser } from "./utils";
import { email, pw } from "./defaults";

it("Logout user successfully.", async () => {
  // Create account
  await registerUser();

  // Attempt login with invalid password
  const resLogin: request.Response = await request(app)
    .post("/api/users/login")
    .send({ email: email.valid, password: pw.valid })
    .expect(200);

  expect(resLogin.get("Set-Cookie")).toBeDefined();

  const resLogout: request.Response = await request(app)
    .post("/api/users/logout")
    .send({})
    .expect(200);

  expect(resLogout.get("Set-Cookie")[0]).toEqual(
    "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
  );
});
