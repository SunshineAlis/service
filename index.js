import express from "express";
import cors from "cors";
import { connectDb } from "./src/schemas/mongo.connection.js";
import { checkEmail } from "./src/authentication/auth.post.js";
import { checkPassword } from "./src/authentication/auth.post.js";
import { createUser } from "./src/controllers/user/users.post.js";
import router from "./src/routers/user.router.js";
const port = 4040;
const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(express.json());

connectDb();

app.use("", router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
