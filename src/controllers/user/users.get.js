import { User } from "../schemas/index.js";

export const checkEmail = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(req.body);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).send({ message: "Email is already registered" });
    }

    //
  } catch (error) {
    console.error("Error checking email:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};
