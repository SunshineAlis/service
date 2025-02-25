import express from "express";
import { checkEmail } from "../controllers/user/users.post.js";
import { checkPassword } from "../middleware/auth.post.js";
import { createUser } from "../controllers/user/users.post.js";

const router = express.Router();

router.post("/", checkEmail);
router.post("/password", checkPassword, createUser);

export default router;
