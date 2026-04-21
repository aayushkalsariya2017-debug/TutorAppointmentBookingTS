import { Tutor } from "../../domain/entities/Tutor";

export class TutorRepository {
  private tutors: Tutor[] = [
    new Tutor(1, "John Smith", "john@email.com", "Math", 25),
    new Tutor(2, "Emily Brown", "emily@email.com", "Java", 30),
    new Tutor(3, "David Lee", "david@email.com", "Web Development", 28),
  ];

  getAllTutors(): Tutor[] {
    return this.tutors;
  }
}
