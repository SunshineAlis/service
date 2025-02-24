import express from "express";
import cors from "cors";
import { connectDb } from "./src/schemas/mongo.connection.js";
import { checkEmail } from "./src/authentication/auth.post.js";
import { checkPassword } from "./src/authentication/auth.post.js";
import { createUser } from "./src/controllers/user/users.post.js";
const port = 4040;
const app = express();


app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(express.json());

connectDb();
app.use("/", (req,res)=>{
  res.send("this is test")

});

app.post("/user/signUp", checkEmail,checkPassword,createUser); // Email check route
 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});