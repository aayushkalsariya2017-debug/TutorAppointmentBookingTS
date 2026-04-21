import request from "supertest";
import app from "../app";

describe("Auth API", () => {
  it("should register a new user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      fullName: "Test User",
      email: "testuser1@email.com",
      password: "1234",
    });

    expect([201, 400]).toContain(res.statusCode);
  });

  it("should login user", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "ayush@email.com",
      password: "1234",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should fail when register fields are missing", async () => {
    const res = await request(app).post("/api/auth/register").send({
      fullName: "",
      email: "",
      password: "",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message");
  });

  it("should fail if user already exists", async () => {
    const res = await request(app).post("/api/auth/register").send({
      fullName: "Ayush",
      email: "ayush@email.com",
      password: "1234",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message");
  });

  it("should fail if user not found", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "notfound@email.com",
      password: "1234",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message");
  });

  it("should fail for wrong password", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "ayush@email.com",
      password: "wrongpassword",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message");
  });
});
