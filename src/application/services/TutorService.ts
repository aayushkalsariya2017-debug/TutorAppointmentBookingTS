import { Tutor } from "../../domain/entities/Tutor";
import { TutorRepository } from "../../infrastructure/repositories/TutorRepository";

export class TutorService {
  private tutorRepository: TutorRepository;

  constructor() {
    this.tutorRepository = new TutorRepository();
  }

  getAllTutors(): Tutor[] {
    return this.tutorRepository.getAllTutors();
  }
}
