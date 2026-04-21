import { Appointment } from "../domain/entities/Appointment";
import { User } from "../domain/entities/User";
import { Tutor } from "../domain/entities/Tutor";
import { Role } from "../domain/enums/Role";

describe("Entity Classes", () => {
  it("should create Appointment correctly", () => {
    const appointment = new Appointment(1, 2, 3, "2026-05-01", "Pending");

    expect(appointment.id).toBe(1);
    expect(appointment.tutorId).toBe(2);
    expect(appointment.userId).toBe(3);
    expect(appointment.date).toBe("2026-05-01");
    expect(appointment.status).toBe("Pending");
  });

  it("should create User correctly", () => {
    const user = new User(
      1,
      "Ayush",
      "ayush@email.com",
      "hashedpass",
      Role.User,
    );

    expect(user.id).toBe(1);
    expect(user.fullName).toBe("Ayush");
    expect(user.email).toBe("ayush@email.com");
    expect(user.password).toBe("hashedpass");
    expect(user.role).toBe(Role.User);
  });

  it("should create Tutor correctly", () => {
    const tutor = new Tutor(1, "John Smith", "john@email.com", "Math", 25);

    expect(tutor.id).toBe(1);
    expect(tutor.fullName).toBe("John Smith");
    expect(tutor.email).toBe("john@email.com");
    expect(tutor.subject).toBe("Math");
    expect(tutor.hourlyRate).toBe(25);
  });
});
