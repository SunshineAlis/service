
import { User } from "../model/user.model.js";

export const authenticateUser = async (req, res, next) => {
    try {
        // ✅ Session ID байгаа эсэхийг шалгах
        if (!req.session || !req.session.userId) {
            return res.status(401).json({ message: "Unauthorized: No active session" });
        }

        const userId = req.session.userId;
        console.log("🚀 Session-ээс хэрэглэгчийн ID:", userId); //

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("❌ Middleware алдаа:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
