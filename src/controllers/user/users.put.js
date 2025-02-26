import { User } from "../../model/user.model.js";


export const updateUser = async (req, res) => {
  try {
    console.log("Received Data:", req.body);

    const userData = req.body;

    const existingUser = await User.findOneAndUpdate(
      { email: userData.email },
      userData
    );

    if (!existingUser) {
      return res.status(404).send({ message: "User not found" });
    }

    await existingUser.save();

    return res
      .status(200)
      .send({ message: "User information updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ message: "Error updating user" });
  }
};

export const forgotPasswordUser = async (req, res) => {
  try {
    console.log("Received Data:", req.body); //

    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).send({ message: "User not found" });
    }

    existingUser.password = password || existingUser.password;

    await existingUser.save();
    res.status(201).send({ message: "User password changed" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};
