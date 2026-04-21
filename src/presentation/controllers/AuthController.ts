import { Request, Response } from "express";
import { AuthService } from "../../application/services/AuthService";
import { logMessage } from "../../infrastructure/logger";

const authService = new AuthService();

export class AuthController {
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const { fullName, email, password } = req.body;

      const result = await authService.register(fullName, email, password);

      if (typeof result === "string") {
        res.status(400).json({ message: result });
        return;
      }

      logMessage(`User registered: ${email}`);

      res.status(201).json(result);
    } catch (error) {
      logMessage(`Register error: ${error}`);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      const result = await authService.login(email, password);

      if (typeof result === "string") {
        res.status(400).json({ message: result });
        return;
      }

      logMessage(`User logged in: ${email}`);

      res.status(200).json(result);
    } catch (error) {
      logMessage(`Login error: ${error}`);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
