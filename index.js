import express from "express";
import cors from "cors";
import { connectDb } from "./src/schemas/mongo.connection.js";
import userRouter from "./src/routers/user.router.js";
import foodRouter from "./src/routers/food.router.js";
import categoryRouter from "./src/routers/category.router.js";
import orderItemRouter from "./src/routers/orderItem.router.js";
import orderRouter from "./src/routers/order.router.js";

const port = 4040;
const app = express();

const corsOptions = {
  origin: "http://localhost:3000", // 改为前端运行的端口
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

app.use("/user", userRouter);
app.use("/foods", foodRouter);
app.use("/category", categoryRouter);
app.use("/orderItem", orderItemRouter);
app.use("/order", orderRouter);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(4040, () => {
  console.log(`Server is running on port ${port}`);
});
