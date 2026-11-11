
import { Response, NextFunction } from "express";

import { AuthRequest } from "../middleware/auth.middleware";
import { ScanInput } from "../schemas/scan.schema";
import { analyzeScam } from "../services/scamAnalyzer.service";

export const analyzeScan = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required"
      });
    }

    const { type, content } = req.body as ScanInput;

    const analysis = analyzeScam({
      type,
      content
    });

    return res.status(200).json({
      success: true,
      message: "Content analyzed successfully",
      analysis: {
        type,
        ...analysis
      }
    });
  } catch (error) {
    next(error);
  }
};
