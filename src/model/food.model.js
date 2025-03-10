import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  foodName: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, },
  ingredients: { type: String, required: true },
  updateAt: { type: Date },
  category: { type: mongoose.Types.ObjectId, ref: "categories" },
});

export const Food = mongoose.model("foods", foodSchema);
