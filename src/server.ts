import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import notificationRoutes from "./routes/notification.routes";
import { verifyMailConnection } from "./config/mail";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({
    success: true,
    message: "Notification server is running",
  });
});

app.use("/api/notifications", notificationRoutes);

const PORT = Number(process.env.PORT || 5001);

app.listen(PORT, async () => {
  console.log(`Notification server running on port ${PORT}`);
  await verifyMailConnection();
});