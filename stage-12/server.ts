import "dotenv/config";
import app from "./src/app";
import { connectDb } from "./config/db";

const PORT = process.env.PORT || 8000;

const start = async () => {
  try {
    await connectDb();
    console.log("✅ Database connected");

    const server = app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
      console.log(`📁 Views directory: src/view`);
      console.log(`📦 Static assets: /public, /assets`);
    });

    process.on("unhandledRejection", (err: Error) => {
      console.error("❌ Unhandled rejection, shutting down...");
      console.error(err);
      server.close(() => process.exit(1));
    });

    process.on("SIGTERM", () => {
      console.log("👋 SIGTERM received, shutting down gracefully...");
      server.close(() => process.exit(0));
    });
  } catch (err) {
    console.error(`❌ Server failed to start. Error: ${err}`);
    process.exit(1);
  }
};

// Start the server
start();

