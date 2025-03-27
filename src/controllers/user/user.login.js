import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../../model/user.model.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, "Secret key", {
      expiresIn: "8h",
    });
    console.log(token);
    
    res.json({ token: token }).status(200);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.log(error);
    
  }
};
