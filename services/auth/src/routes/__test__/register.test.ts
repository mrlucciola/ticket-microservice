import request from "supertest";
import { app } from "../../app";

it("Returns a 201 response on successful account registration.", async () => {
  return request(app)
    .post("/api/users/register")
    .send({ email: "test@test.org", password: "password" })
    .expect(201);
});
