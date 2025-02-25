import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://enkhuushnymo:Mongolia&90@cluster0.cy3yn.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0",
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
