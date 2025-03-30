import { Food } from "../../model/food.model.js";

export const getFoodCountByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    if (!categoryId) {
      return res.status(400).send({ message: "Category ID is required" });
    }
    const foodCount = await Food.countDocuments({ category: categoryId });
    res.status(200).send({
      message: "Current category food count fetched",
      count: foodCount,
    });
  } catch (error) {
    console.error("Error fetching current category food count:", error);
    res.status(500).send({ message: "Server error" });
  }
};

export const getAllFoodCounts = async (req, res) => {
  try {
    const allFoodCounts = await Food.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);
    res
      .status(200)
      .send({ message: "food count fetched", data: allFoodCounts });
  } catch (error) {
    console.error("Error fetching food count:", error);
    res.status(500).send({ message: "Server error" });
  }
};

export const categoryFoods = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    if (!categoryId) {
      return res.status(400).json({ message: "Category ID is required" });
    }
    const foods = await Food.find({ category: categoryId });

    res.status(200).send({ message: "Foods fetched successfully", foods });
  } catch (error) {
    console.error("Error fetching foods:", error);
    res.status(500).send({ message: "Server error" });
  }
};


