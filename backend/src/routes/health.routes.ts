import { Router } from "express";
import mongoose from "mongoose";

const router = Router();

router.get("/", (_req, res) => {
  const databaseConnected =
    mongoose.connection.readyState === 1;

  return res.status(200).json({
    success: true,
    message: "ScamShield API is running",
    database: databaseConnected
      ? "connected"
      : "disconnected",
    timestamp: new Date().toISOString()
  });
});

export default router;