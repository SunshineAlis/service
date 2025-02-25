import mongoose from "mongoose";

const foodCategorySchema = new mongoose.Schema({
  categoryName: { type: String, require: true },
});

export const foodCategory = mongoose.model("category", foodCategorySchema);
