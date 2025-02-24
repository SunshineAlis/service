import { User } from "../schemas/index.js";
import bcrypt from "bcrypt";

export const checkEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    next(); // 
  } catch (error) {
    console.error("Error checking email:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkPassword = async (req, res, next) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const passRe = /^\d{8,}$/;
    if (!passRe.test(password)) {
      return res.status(400).json({
        message: "Password must be at least 8 digits and contain only numbers.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    req.body.password = hashedPassword;

    next(); // 
  } catch (error) {
    console.error("Error checking password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
