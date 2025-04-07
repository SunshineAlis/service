import express from "express";
import multer from "multer";
import { coverImg, getCoverImg } from "../controllers/foodOrder/cover.image.js";

const upload = multer({ dest: "uploads/" });
const imageRouter = express.Router();

imageRouter.post("/", upload.single("cover"), coverImg);

imageRouter.get("/:page", getCoverImg);

export default imageRouter;
