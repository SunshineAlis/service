import { User } from "../schemas/index.js";
import bcrypt from "bcrypt";



export const checkPassword = async (req, res, next) => {
  try {
    const { password } = req.body;

    if (!password) {
      res.status(400).send({ message: "Password is required" });
    }

    const passRe = /^\d{8,}$/;
    if (!passRe.test(password)) {
      res.status(400).send({
        message: "Password must be at least 8 digits and contain only numbers.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    req.body.password = hashedPassword;

    next(); //
  } catch (error) {
    console.error("Error checking password:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};
