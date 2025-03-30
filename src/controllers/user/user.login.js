import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../../model/user.model.js";
// import dotenv from 'dotenv';
// dotenv.config();

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Password does not match" });
    }

    const token = jwt.sign(
      { id: user._id },
      "secretKey",
      { expiresIn: "30d" }
    );
    console.log("Token login:", token);

    return res.status(200).send({
      token,
      user: {
        email: user.email,
        role: user.role,
        phone: user.phone || "",
        address: user.address || "",
      },
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: error.message || "Server error" });
  }
};
