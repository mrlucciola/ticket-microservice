import request from "supertest";
import { app } from "../../app";
// local
import { email, pw } from "./defaults";

/**
 * Skipping validation tests. Will fail regardless because of validation for .
 * Validation tests for login should be on frontend.
 */
it("Fails when email provided does not exist.", async () => {
  await request(app)
    .post("/api/users/login")
    .send({ email: email.nonExistent, password: pw.valid })
    .expect(400);
});

it("Fails when incorrect password is provided for valid account.", async () => {
  // Create account
  await request(app)
    .post("/api/users/register")
    .send({ email: email.valid, password: pw.valid })
    .expect(201);

  // Attempt login with invalid password
  await request(app)
    .post("/api/users/login")
    .send({ email: email.valid, password: pw.incorrect })
    .expect(400);
});

it("Valid login returns cookie.", async () => {
  // Create account
  await request(app)
    .post("/api/users/register")
    .send({ email: email.valid, password: pw.valid })
    .expect(201);

  // Attempt login with invalid password
  const res: request.Response = await request(app)
    .post("/api/users/login")
    .send({ email: email.valid, password: pw.valid })
    .expect(200);

  expect(res.get("Set-Cookie")).toBeDefined();
});
