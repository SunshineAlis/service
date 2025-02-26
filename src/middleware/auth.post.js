import bcrypt from "bcryptjs";

export const checkPassword = async (req, res) => {
  const { password } = req.body;
  try {
    if (!password) {
      res.status(400).json({ message: "Password must be required" });
    }
    deleteOne().body.confirmPassword;
    req.body.password = await bcrypt.hash(password, 10);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
