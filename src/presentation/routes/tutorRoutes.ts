import { Router, Request, Response } from "express";
import { TutorController } from "../controllers/TutorController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/", TutorController.getAllTutors);

router.get("/secure", authMiddleware, (req: Request, res: Response) => {
  res.json({ message: "Protected route accessed" });
});

export default router;
