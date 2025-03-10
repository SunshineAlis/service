import cloudinary from "cloudinary";
import fs from "fs";
import { Food } from "../../model/food.model.js";

export const createFood = async (req, res) => {
  try {
    let imageUrl = process.env.CLOUDINARY_URL;


    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path);
      imageUrl = result.secure_url;


      fs.unlinkSync(req.file.path);
    }

    const newFood = new Food(req.body);

    await newFood.save();

    res.status(201).send({ message: "Food created successfully", foodId: newFood._id });
  } catch (error) {
    console.error("Error creating Food:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};


