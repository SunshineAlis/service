import mongoose from "mongoose";

const foodOrderSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, require: true , ref: ""},
  totalPrice: { type: Number, require: true },
  image: { type: String, require: true },
  ingredients: { type: String, require: true },
  updateAt: { type: Date, require: true },
  category: { type: mongoose.Types.ObjectId, ref: "categories" },
});

export const food = mongoose.model("category", foodOrderSchema);
