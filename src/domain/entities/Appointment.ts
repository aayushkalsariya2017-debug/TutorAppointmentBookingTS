export class Appointment {
  constructor(
    public id: number,
    public tutorId: number,
    public userId: number,
    public date: string,
    public status: string = "Pending",
  ) {}
}
