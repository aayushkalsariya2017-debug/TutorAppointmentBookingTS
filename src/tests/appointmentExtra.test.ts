import request from "supertest";
import app from "../app";

let adminToken = "";
let createdAppointmentId = 0;

describe("Appointment Admin API", () => {
  beforeAll(async () => {
    const loginRes = await request(app).post("/api/auth/login").send({
      email: "ayush@email.com",
      password: "1234",
    });

    adminToken = loginRes.body.token;

    const createRes = await request(app)
      .post("/api/appointments")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        tutorId: 2,
        date: "2026-06-01",
      });

    createdAppointmentId = createRes.body.id;
  });

  it("should approve appointment", async () => {
    const res = await request(app)
      .patch(`/api/appointments/${createdAppointmentId}/approve`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("Approved");
  });

  it("should decline appointment", async () => {
    const res = await request(app)
      .patch(`/api/appointments/${createdAppointmentId}/decline`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("Declined");
  });

  it("should edit appointment date", async () => {
    const res = await request(app)
      .patch(`/api/appointments/${createdAppointmentId}/edit`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        date: "2026-06-10",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.date).toBe("2026-06-10");
  });

  it("should fail when booking with missing fields", async () => {
    const res = await request(app)
      .post("/api/appointments")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({}); // empty body

    expect(res.statusCode).toBe(400);
  });

  it("should return 404 for approving non-existing appointment", async () => {
    const res = await request(app)
      .patch("/api/appointments/999999/approve")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(404);
  });

  it("should return 404 for declining non-existing appointment", async () => {
    const res = await request(app)
      .patch("/api/appointments/999999/decline")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(404);
  });

  it("should fail when edit date is missing", async () => {
    const res = await request(app)
      .patch(`/api/appointments/${createdAppointmentId}/edit`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({});

    expect(res.statusCode).toBe(400);
  });

  it("should block admin routes without token", async () => {
    const res = await request(app).get("/api/appointments");

    expect(res.statusCode).toBe(401);
  });
});
