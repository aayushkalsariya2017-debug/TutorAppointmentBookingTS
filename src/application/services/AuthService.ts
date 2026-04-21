import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { Role } from "../../domain/enums/Role";
import { User } from "../../domain/entities/User";

const userRepository = new UserRepository();

export class AuthService {
  async register(fullName: string, email: string, password: string) {
    if (!fullName || !email || !password) {
      return "All fields are required";
    }

    const existingUser = userRepository.getUserByEmail(email);

    if (existingUser) {
      return "User already exists";
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User(
      Date.now(),
      fullName,
      email,
      hashedPassword,
      Role.User,
    );

    userRepository.addUser(newUser);
    return newUser;
  }

  async login(email: string, password: string) {
    if (!email || !password) {
      return "Email and password are required";
    }

    const user = userRepository.getUserByEmail(email);

    if (!user) {
      return "User not found";
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return "Invalid credentials";
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      "secretkey",
      { expiresIn: "1h" },
    );
    return { token };
  }
}
