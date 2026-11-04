import {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler
} from "express";

export const notFound = (
  req: Request,
  res: Response
) => {
  return res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`
  });
};

export const errorHandler: ErrorRequestHandler = (
  error,
  _req,
  res,
  _next
) => {
  console.error("API Error:", error);

  if (error.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "An account with this email already exists"
    });
  }

  const statusCode = error.status || 500;

  return res.status(statusCode).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : error.message || "Something went wrong"
  });
};