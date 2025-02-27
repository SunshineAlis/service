import { Food } from "../../model/food.model.js";

export const updateFood = async (req, res) => {
  try {
    const { foodId } = req.params; // 从 URL 参数中获取 foodId
    const foodData = req.body; // 获取更新的数据

    const existingFood = await Food.findByIdAndUpdate(foodId, foodData, {
      new: true,
    });

    if (!existingFood) {
      return res.status(404).send({ message: "Food not found" });
    }

    console.log("Food updated successfully:", existingFood);

    res
      .status(200)
      .send({ message: "Food updated successfully", food: existingFood });
  } catch (error) {
    console.error("Error updating Food:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

