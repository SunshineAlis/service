import express from "express";
import { createOrder } from "../controllers/foodOrder/foodOrder.post.js";
import { updateOrder } from "../controllers/foodOrder/foodOrder.put.js";
import { deleteOrder } from "../controllers/foodOrder/foodOrder.delete.js";
import getAllOrders from "../controllers/foodOrder/foodOrder.get.js";
import { getFoodOrderWithFoodDetails } from "../controllers/foodOrder/foodOrder.get.js";

const orderRouter = express.Router();

orderRouter.post("", createOrder);
orderRouter.put("/:orderId", updateOrder);
orderRouter.delete("/:orderId", deleteOrder);
orderRouter.get("", getAllOrders);
orderRouter.get("", getFoodOrderWithFoodDetails)

export default orderRouter;
