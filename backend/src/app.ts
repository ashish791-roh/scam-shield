
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import scanRoutes from "./routes/scan.routes";
import authRoutes from "./routes/auth.routes";
import healthRoutes from "./routes/health.routes";
import submissionRoutes from "./routes/submission.routes";

import {
  notFound,
  errorHandler,
} from "./middleware/error.middleware";

const app = express();

// Security headers
app.use(helmet());

// Frontend connection
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Request body parsing
app.use(express.json({ limit: "20kb" }));
app.use(
  express.urlencoded({
    extended: true,
    limit: "20kb",
  })
);

// Health check (excluded from API rate limiting)
app.use("/api/health", healthRoutes);

// Global API rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

app.use("/api", apiLimiter);

// Stricter login rate limiting
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many login attempts. Please try again after 15 minutes.",
  },
});

// Stricter registration rate limiting
const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many registration attempts. Please try again later.",
  },
});

// Authentication routes
app.use("/api/auth/login", loginLimiter);
app.use("/api/auth/register", registerLimiter);
app.use("/api/auth", authRoutes);

// Other API routes
app.use("/api/scans", scanRoutes);
app.use("/api/submissions", submissionRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

export default app;
