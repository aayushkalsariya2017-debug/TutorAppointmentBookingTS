import { AppointmentService } from "../application/services/AppointmentService";

describe("AppointmentService logic", () => {
  let service: AppointmentService;

  beforeEach(() => {
    service = new AppointmentService();
  });

  it("should return error when fields are missing", () => {
    const result = service.bookAppointment(0, 0, "");
    expect(result).toBe("All fields are required");
  });

  it("should return appointments array for a user", () => {
    const result = service.getAppointmentsByUser(1776659138267);
    expect(Array.isArray(result)).toBe(true);
  });

  it("should return error for editing non-existing appointment", () => {
    const result = service.editAppointment(999999999, "2026-07-01");
    expect(result).toBe("Appointment not found");
  });

  it("should return error for approving non-existing appointment", () => {
    const result = service.approveAppointment(999999999);
    expect(result).toBe("Appointment not found");
  });

  it("should return error for declining non-existing appointment", () => {
    const result = service.declineAppointment(999999999);
    expect(result).toBe("Appointment not found");
  });
});
