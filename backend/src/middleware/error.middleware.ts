
import {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";

export const notFound = (req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
};

export const errorHandler: ErrorRequestHandler = (
  error,
  _req,
  res,
  _next
) => {
  console.error("API Error:", error);

  // Handle MongoDB duplicate-key errors
  if (error?.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "A record with these details already exists",
    });
  }

  // Accept only valid HTTP error status codes
  const requestedStatus = Number(error?.status || error?.statusCode);

  const statusCode =
    Number.isInteger(requestedStatus) &&
    requestedStatus >= 400 &&
    requestedStatus <= 599
      ? requestedStatus
      : 500;

  const isServerError = statusCode >= 500;

  const message =
    process.env.NODE_ENV === "production" && isServerError
      ? "Internal server error"
      : error?.message || "Something went wrong";

  return res.status(statusCode).json({
    success: false,
    message,
  });
};
