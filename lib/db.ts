import mongoose from "mongoose";

const MONGODB_URL: string = process.env.MONGODB_URL as string;

// Prevent multiple connections during hot reload in dev
let isConnected: boolean = false;

export const connectDB = async (): Promise<void> => {
  if (isConnected) {
    console.log("MongoDB already connected");
    return;
  }

  if (!MONGODB_URL) {
    throw new Error("❌ MONGODB_URL is missing in .env file");
  }

  try {
    const conn = await mongoose.connect(MONGODB_URL, {
      dbName: "PureHive",
    });

    isConnected = conn.connections[0].readyState === 1;

    console.log("✅ MongoDB Connected:", conn.connection.host);

  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
};
