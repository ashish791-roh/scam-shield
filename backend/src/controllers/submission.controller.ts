
import { Request, Response, NextFunction } from "express";

import { ContactMessage } from "../models/ContactMessage";
import { ScamReport } from "../models/ScamReport";

import { ContactInput } from "../schemas/contact.schema";
import { ReportInput } from "../schemas/report.schema";

export const submitContactMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body as ContactInput;

    await ContactMessage.create({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    });

    return res.status(201).json({
      success: true,
      message: "Your message has been received. Thank you for contacting ScamShield.",
    });
  } catch (error) {
    next(error);
  }
};

export const submitScamReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body as ReportInput;

    await ScamReport.create({
      type: data.type,
      suspiciousContent: data.suspiciousContent,
      description: data.description,
      reporterName: data.reporterName || undefined,
      reporterEmail: data.reporterEmail || undefined,
    });

    return res.status(201).json({
      success: true,
      message: "Your scam report has been submitted successfully. Thank you for helping improve online safety.",
    });
  } catch (error) {
    next(error);
  }
};
