import request from "supertest";
import app from "../app";

let token = "";

describe("Appointment API", () => {
  beforeAll(async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "ayush@email.com",
      password: "1234",
    });

    token = res.body.token;
  });

  it("should get my appointments", async () => {
    const res = await request(app)
      .get("/api/appointments/my")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });

  it("should block request without token", async () => {
    const res = await request(app).get("/api/appointments/my");
    expect(res.statusCode).toBe(401);
  });
});
    