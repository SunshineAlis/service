import express from "express";
import { checkEmail } from "../controllers/user/users.get.js";
import { createUser } from "../controllers/user/users.post.js";
import { updateUser } from "../controllers/user/users.put.js";
import { login } from "../controllers/user/user.login.js";

const userRouter = express.Router();

userRouter.post("", checkEmail);
userRouter.post("/signup", createUser);
userRouter.put("/information", updateUser);
userRouter.post("/login", login);

export default userRouter;
