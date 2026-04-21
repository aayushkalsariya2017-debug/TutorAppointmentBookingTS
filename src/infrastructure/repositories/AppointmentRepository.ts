import fs from "fs";
import path from "path";
import { Appointment } from "../../domain/entities/Appointment";

export class AppointmentRepository {
  private filePath = path.join(__dirname, "../database/appointments.json");

  private readAppointments(): Appointment[] {
    const data = fs.readFileSync(this.filePath, "utf-8");
    return JSON.parse(data);
  }

  private writeAppointments(appointments: Appointment[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(appointments, null, 2));
  }

  addAppointment(appointment: Appointment): void {
    const appointments = this.readAppointments();
    appointments.push(appointment);
    this.writeAppointments(appointments);
  }

  getAllAppointments(): Appointment[] {
    return this.readAppointments();
  }

  getAppointmentById(id: number): Appointment | undefined {
    const appointments = this.readAppointments();
    return appointments.find((a) => a.id === id);
  }

  updateAppointment(updatedAppointment: Appointment): void {
    const appointments = this.readAppointments();
    const index = appointments.findIndex((a) => a.id === updatedAppointment.id);

    if (index !== -1) {
      appointments[index] = updatedAppointment;
      this.writeAppointments(appointments);
    }
  }
}
