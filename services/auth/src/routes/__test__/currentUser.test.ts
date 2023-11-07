import request from "supertest";
import { app } from "../../app";
// local
import { email } from "./defaults";
import { registerUser } from "./utils";

it("Responds with details about current user", async () => {
  const cookie = await registerUser();

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
