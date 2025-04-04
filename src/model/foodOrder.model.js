import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  foodId: { type: mongoose.Schema.Types.ObjectId, ref: "Food", required: true },
  foodName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const foodOrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  contactInfo: {
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true }
  },
  items: [orderItemSchema],
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["PENDING", "PROCESSING", "DELIVERED", "CANCELLED"],
    default: "PENDING"
  },
  createdAt: { type: Date, default: Date.now }
});

export const FoodOrder = mongoose.model("FoodOrder", foodOrderSchema);





