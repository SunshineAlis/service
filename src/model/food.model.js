import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  foodName: { type: String, require: true },
  price: { type: Number, require: true },
  image: { type: String, },
  ingredients: { type: String, require: true },
  updateAt: { type: Date },
  category: { type: mongoose.Types.ObjectId, ref: "categories" },
});

export const Food = mongoose.model("foods", foodSchema);
