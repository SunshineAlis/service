import { User } from "../../model/user.model.js";
import bcrypt from "bcryptjs";

export const createUser = async (req, res) => {
  try {
    console.log("Received Data:", req.body); //

    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email: email, password: hashedPassword });
    await newUser.save();
    console.log(hashedPassword);
    console.log("User saved successfully:", newUser);

    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};
