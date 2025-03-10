import express from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import { createFood } from "../controllers/food/food.post.js";
import { updateFood } from "../controllers/food/food.put.js";
import { deleteFood } from "../controllers/food/food.delete.js";

const foodRouter = express.Router();


const storage = multer.diskStorage({});
const upload = multer({ storage });

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


foodRouter.post("", upload.single("image"), createFood);
foodRouter.put("/information/:foodId", updateFood);
foodRouter.delete("/delete", deleteFood);

export default foodRouter;
