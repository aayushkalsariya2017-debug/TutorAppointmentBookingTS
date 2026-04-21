import { Router } from "express";
import { AppointmentController } from "../controllers/AppointmentController";
import { authMiddleware } from "../middleware/authMiddleware";
import { adminMiddleware } from "../middleware/roleMiddleware";

const router = Router();

router.post("/", authMiddleware, AppointmentController.bookAppointment);
router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  AppointmentController.getAllAppointments,
);
router.get("/my", authMiddleware, AppointmentController.getMyAppointments);

router.patch(
  "/:id/approve",
  authMiddleware,
  adminMiddleware,
  AppointmentController.approveAppointment,
);
router.patch(
  "/:id/decline",
  authMiddleware,
  adminMiddleware,
  AppointmentController.declineAppointment,
);
router.patch(
  "/:id/edit",
  authMiddleware,
  adminMiddleware,
  AppointmentController.editAppointment,
);

export default router;
