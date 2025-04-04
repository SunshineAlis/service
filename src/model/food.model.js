import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
  foodName: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  ingredients: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true }, // 🟢 Шаардлагатай болгосон
  updateAt: { type: Date, default: Date.now }
});

export const Food = mongoose.model("Food", foodSchema);
