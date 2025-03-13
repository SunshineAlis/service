import { Food } from "../../model/food.model.js";
import mongoose from "mongoose";
import { uploadImage } from "./cloudinaryService.js";

export const createFood = async (req, res) => {
  try {
    let imageUrl = null;

    if (req.file) {
      try {
        imageUrl = await uploadImage(req.file.buffer); // `buffer` ашиглах
      } catch (uploadError) {
        console.error("Error uploading image:", uploadError);
        return res.status(500).send({ message: "Failed to upload image", details: uploadError.message });
      }
    }

    const { foodName, price, ingredients, categoryId } = req.body;

    // Оролтын шалгалт
    if (!foodName || !price || !ingredients || !categoryId) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    const newFood = new Food({
      foodName,
      price,
      image: imageUrl || null,
      ingredients,
      category: new mongoose.Types.ObjectId(categoryId),
    });

    await newFood.save();
    res.status(201).send({ message: "Food added successfully", food: newFood });

  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).send({ message: "Internal Server Error", details: error.message });
  }
};
