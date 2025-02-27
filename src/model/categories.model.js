import mongoose from "mongoose";

const foodCategorySchema = new mongoose.Schema({
  categoryName: { type: String, require: true },
});

export const Category = mongoose.model("categories", foodCategorySchema);
