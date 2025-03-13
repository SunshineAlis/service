import express from "express";
import multer from "multer";
import { createFood } from "../controllers/food/food.post.js";
import { updateFood } from "../controllers/food/food.put.js";
import { deleteFood } from "../controllers/food/food.delete.js";
import { getFoodCountByCategory, categoryFoods } from "../controllers/food/food.get.js";

const upload = multer({ storage: multer.memoryStorage() }); // 使用内存存储

const foodRouter = express.Router();

foodRouter.post("", upload.single('image'), createFood);
foodRouter.put("/:foodId", upload.single('image'), updateFood);
foodRouter.delete("/:foodId", deleteFood);
foodRouter.get("/:categoryId/foodCount", getFoodCountByCategory);
foodRouter.get("/:categoryId/foods", categoryFoods);

export default foodRouter;