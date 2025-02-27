import express from "express";
import { createFood } from "../controllers/food/food.post.js";


const route = express.Router();

route.post("", createFood);


export default route;
