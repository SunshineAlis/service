import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../../model/user.model.js";

export const updateUser = async (req, res) => {
  try {
    const { email, password, newPassword, phone, address } = req.body;
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).send({ message: 'Access denied. No token provided' });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, "secretKey");
    } catch (err) {
      console.error("JWT verification failed:", err);
      return res.status(401).send({ message: 'Invalid token' });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).send({ message: 'Email already registered' });
      }
      user.email = email;
    }

    if (password && newPassword) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).send({ message: 'Password is incorrect' });
      }
      user.password = await bcrypt.hash(newPassword, 3);
    }

    user.phone = phone || user.phone;
    user.address = address || user.address;

    await user.save();

    res.status(200).send({
      message: "User information updated successfully",
      user: {
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ message: "Server error: " + error.message });
  }
};


export const forgotPasswordUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).send({ message: "User not found" });
    }

    if (!password) {
      return res.status(400).send({ message: "New password is required" });
    }
    const hashedPassword = await bcrypt.hash(password, 3);
    existingUser.password = hashedPassword;

    await existingUser.save();
    res.status(200).send({ message: "User password changed successfully" });
  } catch (error) {
    console.error("Error updating user password:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};