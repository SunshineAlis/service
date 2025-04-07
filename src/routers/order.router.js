import express from "express";
import { createOrder } from "../controllers/foodOrder/foodOrder.post.js";
import { updateOrderStatus } from "../controllers/foodOrder/foodOrder.put.js";
import { deleteOrder } from "../controllers/foodOrder/foodOrder.delete.js";
import { getOrders } from "../controllers/foodOrder/foodOrder.get.js";


const orderRouter = express.Router();

orderRouter.post("", createOrder);
orderRouter.put("/:id", updateOrderStatus);
orderRouter.delete("/:id", deleteOrder);
orderRouter.get("", getOrders);


export default orderRouter;
