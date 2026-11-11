import dotenv from "dotenv";
import app from "./app";
import { connectDatabase } from "./config/database";

dotenv.config();

const PORT = Number(process.env.PORT) || 5000;

const validateEnvironment = (): void => {
  const requiredVariables = ["MONGODB_URI", "JWT_SECRET"];

  const missingVariables = requiredVariables.filter(
    (variable) => !process.env[variable]
  );

  if (missingVariables.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVariables.join(", ")}`
    );
  }

  if (
    process.env.NODE_ENV === "production" &&
    process.env.JWT_SECRET!.length < 32
  ) {
    throw new Error(
      "JWT_SECRET must be at least 32 characters long in production."
    );
  }

  if (!Number.isInteger(PORT) || PORT < 1 || PORT > 65535) {
    throw new Error("PORT must be a valid port number.");
  }
};

const startServer = async (): Promise<void> => {
  try {
    validateEnvironment();

    console.log("Connecting to MongoDB...");

    await connectDatabase();

    app.listen(PORT, () => {
      console.log(`ScamShield API running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
    });
  } catch (error) {
    console.error("Failed to start ScamShield:", error);
    process.exit(1);
  }
};

void startServer();
