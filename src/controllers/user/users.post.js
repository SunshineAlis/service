import { User } from "../../schemas/index.js";
export const createEmail = async (req, res, next) => {
  try {
    console.log("Received Data:", req.body); //

    const { email } = req.body;

    const newEmail = new User({ email });
    await newUser.save();

    console.log("User saved successfully:", newEmail);

    res.status(201).send({ message: "User created successfully" });
    next();
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const createUser = async (req, res) => {
  try {
    console.log("Received Data:", req.body); //

    const { email, password } = req.body;

    const newUser = new User({ email, password });
    await newUser.save();

    console.log("User saved successfully:", newUser);

    res.status(201).send({ message: "User created successfully" });
    next();
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};
