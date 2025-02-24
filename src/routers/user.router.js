import express from "express";
import { connectDb } from "./src/schemas/mongo.connection.js";
import { checkEmail } from "./src/authentication/auth.post.js";
import { checkPassword } from "./src/controllers/user/users.post.js";
import { createUser } from "./src/controllers/user/users.post.js";

const router = express.Router();
connectDb();
router.post("/", checkEmail, checkPassword,createUser );


export default router;