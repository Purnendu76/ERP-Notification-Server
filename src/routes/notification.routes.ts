import { Router } from "express";
import { z } from "zod";
import { sendNewUserWelcomeEmail } from "../services/mail.service";

const router = Router();

const newUserEmailSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  role: z.enum(["Admin", "Manager", "Staff"]),
  temporaryPassword: z.string().optional(),
});

router.post("/new-user", async (req, res) => {
  try {
    const apiKey = req.headers["x-api-key"];

    if (apiKey !== process.env.NOTIFICATION_API_KEY) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized notification request",
      });
    }

    const payload = newUserEmailSchema.parse(req.body);

    await sendNewUserWelcomeEmail(payload);

    return res.status(200).json({
      success: true,
      message: "Welcome email sent successfully",
    });
  } catch (error) {
    console.error("Send new user email error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send welcome email",
    });
  }
});

export default router;