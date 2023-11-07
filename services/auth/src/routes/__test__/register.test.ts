import request from "supertest";
import { app } from "../../app";
// local
import { email, pw } from "./defaults";

it("Returns a 201 response on successful account registration.", async () => {
  return await request(app)
    .post("/api/users/register")
    .send({ email: email.valid, password: pw.valid })
    .expect(201);
});

it("Returns a 400 with an invalid email", async () => {
  return await request(app)
    .post("/api/users/register")
    .send({ email: email.invalid, password: pw.valid })
    .expect(400);
});

it("Returns a 400 with an invalid password", async () => {
  await request(app)
    .post("/api/users/register")
    .send({ email: email.valid, password: pw.invalid.lenMax })
    .expect(400);
  await request(app)
    .post("/api/users/register")
    .send({ email: email.valid, password: pw.invalid.lenMin })
    .expect(400);
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
  await request(app)
    .post("/api/users/register")
    .send({ email: email.valid, password: pw.valid })
    .expect(201);
  await request(app)
    .post("/api/users/register")
    .send({ email: email.valid, password: pw.valid })
    .expect(400);
});

it("Sets a cookie after successful user-registration", async () => {
  const res: request.Response = await request(app)
    .post("/api/users/register")
    .send({ email: email.valid, password: pw.valid })
    .expect(201);

  expect(res.get("Set-Cookie")).toBeDefined();
});
