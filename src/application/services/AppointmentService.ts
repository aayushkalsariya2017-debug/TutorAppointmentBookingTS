import { Appointment } from "../../domain/entities/Appointment";
import { AppointmentRepository } from "../../infrastructure/repositories/AppointmentRepository";

const appointmentRepository = new AppointmentRepository();

export class AppointmentService {
  bookAppointment(tutorId: number, userId: number, date: string) {
    if (!tutorId || !userId || !date) {
      return "All fields are required";
    }

    const existingAppointments = appointmentRepository.getAllAppointments();

    const alreadyBooked = existingAppointments.find(
      (a) => a.tutorId === tutorId && a.date === date,
    );

    if (alreadyBooked) {
      return "This tutor is already booked for that date";
    }

    const newAppointment = new Appointment(
      Date.now(),
      tutorId,
      userId,
      date,
      "Pending",
    );

    appointmentRepository.addAppointment(newAppointment);
    return newAppointment;
  }

  getAllAppointments() {
    return appointmentRepository.getAllAppointments();
  }

  getAppointmentsByUser(userId: number) {
    const appointments = appointmentRepository.getAllAppointments();
    return appointments.filter((a) => a.userId === userId);
  }

  approveAppointment(id: number) {
    const appointment = appointmentRepository.getAppointmentById(id);

    if (!appointment) {
      return "Appointment not found";
    }

    appointment.status = "Approved";
    appointmentRepository.updateAppointment(appointment);
    return appointment;
  }

  declineAppointment(id: number) {
    const appointment = appointmentRepository.getAppointmentById(id);

    if (!appointment) {
      return "Appointment not found";
    }

    appointment.status = "Declined";
    appointmentRepository.updateAppointment(appointment);
    return appointment;
  }

  editAppointment(id: number, newDate: string) {
    const appointment = appointmentRepository.getAppointmentById(id);

    if (!appointment) {
      return "Appointment not found";
    }

    if (!newDate) {
      return "New date is required";
    }

    appointment.date = newDate;
    appointmentRepository.updateAppointment(appointment);
    return appointment;
  }
}
