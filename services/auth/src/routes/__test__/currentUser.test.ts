import request from "supertest";
import { app } from "../../app";
// local
import { email, pw } from "./defaults";

it("Responds with details about current user", async () => {
  // Create account
  const resRegister = await request(app)
    .post("/api/users/register")
    .send({ email: email.valid, password: pw.valid })
    .expect(201);

  const cookie = resRegister.get("Set-Cookie");

  // Get user info
  const res: request.Response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(res.body.currentUser.email).toEqual(email.valid);
});

it("Responds with null if not authenticated", async () => {
  const res = await request(app)
    .get("/api/users/currentuser")
    .send()
    .expect(401);

  expect(res.body.msg).toEqual("Unauthorized");
});
