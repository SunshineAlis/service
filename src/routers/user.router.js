import express from "express";
import { checkEmail } from "../controllers/user/users.post.js";
import { checkPassword } from "../middleware/auth.post.js";
import {  createUser } from "../controllers/user/users.post.js";

const router = express.Router();

router.post("/", checkEmail);
router.post("/password", checkPassword, createUser);


// // 检查邮箱是否存在
// router.post("/check-email", checkEmail);

// // 查询与邮箱关联的密码
// router.post("/get-password", getPassword);

export default router;
