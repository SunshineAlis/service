import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
export const connectDb = async () => {
  try {
    await mongoose.connect(
      process.env.DATABASE_CONNECTION_URL,

      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
console.log("MongoDB URI:", process.env.DATABASE_CONNECTION_URL);