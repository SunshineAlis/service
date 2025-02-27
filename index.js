import express from "express";
import cors from "cors";
import { connectDb } from "./src/schemas/mongo.connection.js";
import router from "./src/routers/user.router.js";
import route from "./src/routers/food.router.js";

const port = 4040;
const app = express();

const corsOptions = {

  origin: "http://localhost:3000",
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());

connectDb();

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError) {
    return res.status(400).json({ error: "Invalid JSON format" });
  }
  next();
});

app.use("/user", router);
app.use("/foods", route)

app.listen(4040, () => {
  console.log(`Server is running on port ${port}`);
});
