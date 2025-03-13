import mongoose from "mongoose";
import { Food } from "./food.model.js";

const foodCategorySchema = new mongoose.Schema({
  categoryName: { type: String, required: true },
});


foodCategorySchema.methods.getFoodCount = async function () {
  const foodCount = await Food.countDocuments({ category: this._id });
  return foodCount;
};

export const Category = mongoose.model("categories", foodCategorySchema);