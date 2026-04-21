import fs from "fs";
import path from "path";
import { User } from "../../domain/entities/User";

export class UserRepository {
  private filePath = path.join(__dirname, "../database/users.json");

  private readUsers(): User[] {
    const data = fs.readFileSync(this.filePath, "utf-8");
    return JSON.parse(data);
  }

  private writeUsers(users: User[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(users, null, 2));
  }

  addUser(user: User): void {
    const users = this.readUsers();
    users.push(user);
    this.writeUsers(users);
  }

  getUserByEmail(email: string): User | undefined {
    const users = this.readUsers();
    return users.find((user) => user.email === email);
  }

  getAllUsers(): User[] {
    return this.readUsers();
  }
}
