import request from "supertest";
import { app } from "../../app";
// local
import { registerUser } from "./utils";
import { email, pw } from "./defaults";

it("Returns a 201 response on successful account registration.", async () => {
  await registerUser();
});

it("Returns a 400 with an invalid email", async () => {
  await registerUser(email.invalid, pw.valid, 400);
});

it("Returns a 400 with an invalid password", async () => {
  await registerUser(email.valid, pw.invalid.lenMax, 400);

  await registerUser(email.valid, pw.invalid.lenMin, 400);
});

it("Returns a 400 with an missing email and password", async () => {
  // missing password
  await request(app)
    .post("/api/users/register")
    .send({ email: email.invalid })
    .expect(400);

  // missing email
  await request(app)
    .post("/api/users/register")
    .send({ password: pw.valid })
    .expect(400);
});

it("Disallows duplicate emails", async () => {
  await registerUser();

  await registerUser(email.valid, pw.valid, 400);
});

it("Sets a cookie after successful user-registration", async () => {
  const cookie = await registerUser();

  // Cookie must be defined
  expect(cookie).toBeDefined();
});
