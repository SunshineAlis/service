import express from "express";
import { checkEmail } from "../controllers/user/users.get.js";
import { createUser } from "../controllers/user/users.post.js";
import { updateUser } from "../controllers/user/users.put.js";

const router = express.Router();

router.get("/", checkEmail);
router.post("/signUp", createUser);
router.put("/information", updateUser);

export default router;
