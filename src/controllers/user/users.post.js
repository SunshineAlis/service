export const createUser = async (req, res) => {
  try {
    console.log("Received Data:", req.body); // 

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const newUser = new User({ email, password });
    await newUser.save();

    console.log("User saved successfully:", newUser);

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
