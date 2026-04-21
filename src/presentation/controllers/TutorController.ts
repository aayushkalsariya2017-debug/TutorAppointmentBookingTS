import { Request, Response } from "express";
import { TutorService } from "../../application/services/TutorService";

const tutorService = new TutorService();

export class TutorController {
  static getAllTutors(req: Request, res: Response): void {
    const tutors = tutorService.getAllTutors();
    res.status(200).json(tutors);
  }
}
