import "dotenv/config";

import app from "./app";
import { connectDatabase } from "./config/database";

const PORT = Number(process.env.PORT) || 5000;

const startServer = async () => {
  try {
    console.log("Connecting to MongoDB...");

    await connectDatabase();

    app.listen(PORT, () => {
      console.log(
        `ScamShield API running at http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error("Failed to start ScamShield:", error);
    process.exit(1);
  }
};

startServer();