
import { Router } from "express";
import rateLimit from "express-rate-limit";

import {
  submitContactMessage,
  submitScamReport,
} from "../controllers/submission.controller";

import { validateBody } from "../middleware/validate.middleware";
import { contactSchema } from "../schemas/contact.schema";
import { reportSchema } from "../schemas/report.schema";

const router = Router();

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many contact submissions. Please try again later.",
  },
});

const reportLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many scam reports. Please try again later.",
  },
});

router.post(
  "/contact",
  contactLimiter,
  validateBody(contactSchema),
  submitContactMessage
);

router.post(
  "/reports",
  reportLimiter,
  validateBody(reportSchema),
  submitScamReport
);

export default router;
