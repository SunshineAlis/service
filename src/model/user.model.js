import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  confirmPassword: { type: String },
  createdAt: { type: Date, default: Date.now },
  phoneNumber: { type: Number, require: true },
  address: { type: String, require: true },
  role: {
    type: String,
    require: true,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
  address: { type: String, require: true },
  isVerified: { type: Boolean },
});

export const User = mongoose.model("user", userSchema);
