import express from "express";
import { createCategory } from "../controllers/categories/categories.post.js";
import { updateCategory } from "../controllers/categories/categories.put.js";
import { deleteCategory } from "../controllers/categories/categories.delete.js";
import { getCategory } from "../controllers/categories/categories.get.js"; // 

const categoryRouter = express.Router();



categoryRouter.post("/", createCategory);
categoryRouter.put("/:categoryId", updateCategory);
categoryRouter.delete("/:categoryId", deleteCategory);
categoryRouter.get("/", getCategory);




export default categoryRouter;