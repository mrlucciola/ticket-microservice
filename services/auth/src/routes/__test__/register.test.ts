import request from "supertest";
import { app } from "../../app";

it("Returns a 201 response on successful account registration.", async () => {
  return request(app)
    .post("/api/users/register")
    .send({ email: "test@test.org", password: "password" })
    .expect(201);
});

it("Returns a 400 with an invalid email", async () => {
  return await request(app)
    .post("/api/users/register")
    .send({ email: "test test", password: "password" })
    .expect(400);
});
