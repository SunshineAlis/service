import express from "express";
import cors from "cors";
import { connectDb } from "./src/connection/mongo.connection.js";
import userRouter from "./src/routers/user.router.js";
import foodRouter from "./src/routers/food.router.js";
import categoryRouter from "./src/routers/category.router.js";
import orderRouter from "./src/routers/order.router.js";
import imageRouter from "./src/routers/image.router.js";

const port = process.env.PORT || 3030;
const app = express();


const corsOptions = {
  origin: [
    "https://sunshinealis-client.onrender.com",
    "https://food-gxmwxt337-bumantuyas-projects.vercel.app",
    "https://client-q6przmqz5-bumantuyas-projects.vercel.app"

  ],
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
connectDb();

app.use("/user", userRouter);
app.use("/foods", foodRouter);
app.use("/category", categoryRouter);
app.use("/order", orderRouter);
app.use("/img", imageRouter);

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError) {
    return res.status(400).send({ error: "Invalid JSON format" });
  }
  next();
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// taskkill / IM node.exe / F