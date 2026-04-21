import jwt from "jsonwebtoken";
import { authMiddleware } from "../presentation/middleware/authMiddleware";
import { adminMiddleware } from "../presentation/middleware/roleMiddleware";

describe("Middleware", () => {
  it("authMiddleware should return 401 if no token provided", () => {
    const req: any = { headers: {} };
    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "No token provided" });
    expect(next).not.toHaveBeenCalled();
  });

  it("authMiddleware should call next for valid token", () => {
    const token = jwt.sign(
      { id: 1, email: "admin@email.com", role: "Admin" },
      "secretkey",
    );

    const req: any = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();

    authMiddleware(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.user).toBeDefined();
  });

  it("adminMiddleware should return 403 for non-admin", () => {
    const req: any = {
      user: { role: "User" },
    };

    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();

    adminMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      message: "Access denied. Admins only.",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("adminMiddleware should call next for admin", () => {
    const req: any = {
      user: { role: "Admin" },
    };

    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();

    adminMiddleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});
