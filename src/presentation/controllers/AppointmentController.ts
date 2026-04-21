import { Response } from "express";
import { AppointmentService } from "../../application/services/AppointmentService";
import { logMessage } from "../../infrastructure/logger";

const appointmentService = new AppointmentService();

export class AppointmentController {
  static bookAppointment(req: any, res: Response): void {
    try {
      const { tutorId, date } = req.body;
      const userId = req.user.id;

      const result = appointmentService.bookAppointment(tutorId, userId, date);

      if (typeof result === "string") {
        res.status(400).json({ message: result });
        return;
      }

      logMessage(`User ${userId} booked tutor ${tutorId} on ${date}`);

      res.status(201).json(result);
    } catch (error) {
      logMessage(`Book appointment error: ${error}`);
      res.status(500).json({ message: "Something went wrong" });
    }
  }

  static getAllAppointments(req: any, res: Response): void {
    try {
      const appointments = appointmentService.getAllAppointments();

      logMessage(`Admin viewed all appointments`);

      res.status(200).json(appointments);
    } catch (error) {
      logMessage(`Get all appointments error: ${error}`);
      res.status(500).json({ message: "Something went wrong" });
    }
  }

  static getMyAppointments(req: any, res: Response): void {
    try {
      const userId = req.user.id;
      const appointments = appointmentService.getAppointmentsByUser(userId);

      logMessage(`User ${userId} viewed their appointments`);

      res.status(200).json(appointments);
    } catch (error) {
      logMessage(`Get my appointments error: ${error}`);
      res.status(500).json({ message: "Something went wrong" });
    }
  }

  static approveAppointment(req: any, res: Response): void {
    try {
      const id = Number(req.params.id);

      const result = appointmentService.approveAppointment(id);

      if (typeof result === "string") {
        res.status(404).json({ message: result });
        return;
      }

      logMessage(`Admin approved appointment ${id}`);

      res.status(200).json(result);
    } catch (error) {
      logMessage(`Approve appointment error: ${error}`);
      res.status(500).json({ message: "Something went wrong" });
    }
  }

  static declineAppointment(req: any, res: Response): void {
    try {
      const id = Number(req.params.id);

      const result = appointmentService.declineAppointment(id);

      if (typeof result === "string") {
        res.status(404).json({ message: result });
        return;
      }

      logMessage(`Admin declined appointment ${id}`);

      res.status(200).json(result);
    } catch (error) {
      logMessage(`Decline appointment error: ${error}`);
      res.status(500).json({ message: "Something went wrong" });
    }
  }

  static editAppointment(req: any, res: Response): void {
    try {
      const id = Number(req.params.id);
      const { date } = req.body;

      const result = appointmentService.editAppointment(id, date);

      if (typeof result === "string") {
        res.status(400).json({ message: result });
        return;
      }

      logMessage(`Admin edited appointment ${id} to new date ${date}`);

      res.status(200).json(result);
    } catch (error) {
      logMessage(`Edit appointment error: ${error}`);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
}
