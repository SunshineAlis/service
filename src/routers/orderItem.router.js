import express from "express";
import { createOrderItem } from "../controllers/orderItem/orderItem.post.js";
import { updatOrderItem } from "../controllers/orderItem/orderItem.put.js";
import { deleteOrderItem } from "../controllers/orderItem/orderItem.delete.js";

const orderItemRouter = express.Router();

orderItemRouter.post("", createOrderItem);
orderItemRouter.put("/: orderItemId", updatOrderItem);
orderItemRouter.delete("", deleteOrderItem);

export default orderItemRouter;
