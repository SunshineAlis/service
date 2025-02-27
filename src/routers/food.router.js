import express from "express";
import { createFood } from "../controllers/food/food.post.js";
import { updateFood } from "../controllers/food/food.put.js";
import { deleteFood } from "../controllers/food/food.delete.js";

const foodRouter = express.Router();

foodRouter.post("", createFood);
foodRouter.put("/information/:foodId", updateFood);
foodRouter.delete("/delete", deleteFood);

export default foodRouter;
