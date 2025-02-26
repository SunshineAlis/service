import { User } from "../../model/user.model.js";

export const checkEmail = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(req.body);
    if (!req.body.email) {
      return res.status(400).json({ error: "Please enter email!" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "Email is already registered" });
    } else {
      return res.status(200).send({ message: "let's go " });
    }
  } catch (error) {
    res.status(500).send({ message: "Error checking email" });
  }
};
