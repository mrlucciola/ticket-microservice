import request from "supertest";
import { app } from "../../app";

const email = {
  valid: "test@test.org",
  invalid: "test test",
};
const pw = {
  valid: "password",
  invalid: {
    lenMin: "p",
    lenMax: "a12345678901234567890",
  },
};

it("Returns a 201 response on successful account registration.", async () => {
  return request(app)
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
