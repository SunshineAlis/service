import mongoose from "mongoose";

const foodOrderSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, require: true, ref: "users" },
  totalPrice: { type: Number, require: true },
  foodOrderItem: [
    {
      food: { type: mongoose.Types.ObjectId, ref: "foods" },
      quantity: { type: Number, required: true },
    },
  ],
  status: { type: String, enum: ["PENDING", "CANCELED", "DELIVERED"] },
  image: { type: String, require: true },
  category: { type: mongoose.Types.ObjectId, ref: "categories" },
});

export const foodOrder = mongoose.model("foodOrder", foodOrderSchema);
