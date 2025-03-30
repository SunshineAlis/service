import { Food } from "../../model/food.model.js";

export const deleteFood = async (req, res) => {
  try {
    const { foodId } = req.params; //
    const foodData = req.body; //

    const existingFood = await Food.findByIdAndDelete(foodId, foodData, {
      new: true,
    });

    if (!existingFood) {
      return res.status(404).send({ message: "Food not found" });
    }



    res
      .status(200)
      .send({ message: "Food deleted successfully", food: existingFood });
  } catch (error) {
    console.error("Error updating Food:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};
