import express from "express";
import { checkEmail } from "../controllers/user/users.get.js";
import { checkPassword } from "../authentication/auth.post.js";
import { createEmail, createUser } from "../controllers/user/users.post.js";

const router = express.Router();

router.get("/user", checkEmail);
router.post("/password", checkPassword, createUser);

router.use(authMiddleware);

// // 检查邮箱是否存在
// router.post("/check-email", checkEmail);

// // 查询与邮箱关联的密码
// router.post("/get-password", getPassword);

export default router;
