import express from "express";
import { checkEmail } from "../controllers/user/users.post.js";
import { createUser } from "../controllers/user/users.post.js";
import { forgotPasswordUser, updateUser } from "../controllers/user/users.put.js";
import { login } from "../controllers/user/user.login.js";



const userRouter = express.Router();

userRouter.post("", checkEmail);
userRouter.post("/signup", createUser);
userRouter.post("/login", login);
userRouter.put("/information", updateUser);
userRouter.put("/Pass", forgotPasswordUser)


export default userRouter;
