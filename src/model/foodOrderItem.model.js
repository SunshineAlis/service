import mongoose from "mongoose";

const foodOrderItemSchema = new mongoose.Schema({
   food: { type: mongoose.Types.ObjectId, ref: "foods" },
   quantity: { type: Number, required: true },
   category: { type: mongoose.Types.ObjectId, ref: "categories" },
});
export const foodOrderItem = mongoose.model("foodOrderItem", foodOrderItemSchema)