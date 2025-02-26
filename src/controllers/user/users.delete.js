import { User } from "../../model/user.model";

export const deleteUser = async (req, res) => {
  try {
    console.log("Received Data:", req.body);

    const userData = req.body;

    const existingUser = await User.findOneAndDelete(
      { email: userData.email },
      userData
    );

    if (!existingUser) {
      return res.status(404).send({ message: "User not found" });
    }

    await existingUser.save();

    return res
      .status(200)
      .send({ message: "User information deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ message: "Error updating user" });
  }
};
