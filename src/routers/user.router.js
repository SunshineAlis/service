import express from "express";
import { checkEmail } from "../controllers/user/users.get.js";
import { createUser } from "../controllers/user/users.post.js";
import { updateUser } from "../controllers/user/users.put.js";

const userRouter = express.Router();

userRouter.post("", checkEmail);
userRouter.post("/signUp", createUser);
userRouter.put("/information", updateUser);

export default userRouter;
