import express from "express";
import { createOrder } from "../controllers/foodOrder/foodOrder.post.js";
import { updateOrder } from "../controllers/foodOrder/foodOrder.put.js"
import { deleteOrder } from "../controllers/foodOrder/foodOrder.delete.js"
const orderRouter = express.Router();

orderRouter.post("", createOrder);
orderRouter.put("/:orderId", updateOrder);
orderRouter.delete("", deleteOrder);

export default orderRouter;
