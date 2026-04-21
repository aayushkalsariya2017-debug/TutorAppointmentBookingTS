import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../app";

describe("Tutor API", () => {
  it("should get all tutors", async () => {
    const res = await request(app).get("/api/tutors");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should block secure tutors route without token", async () => {
    const res = await request(app).get("/api/tutors/secure");

    expect(res.statusCode).toBe(401);
  });

  it("should allow secure tutors route with valid token", async () => {
    const token = jwt.sign(
      { id: 1, email: "admin@email.com", role: "Admin" },
      "secretkey",
    );

    const res = await request(app)
      .get("/api/tutors/secure")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message");
  });
});
