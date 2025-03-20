import mongoose from "mongoose";

const foodOrderSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, require: true, ref: "users" },
  totalPrice: { type: Number, require: true },
  foodOrderItem: { type: mongoose.Types.ObjectId, require: true, ref: "foodOrderItem" },
  status: { type: String, enum: ["PENDING", "CANCELED", "DELIVERED"] },
  image: { type: String, require: true },
  category: { type: mongoose.Types.ObjectId, ref: "categories" },
});

export const foodOrder = mongoose.model("foodOrder", foodOrderSchema);
