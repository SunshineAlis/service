import { Food } from "../../model/food.model.js";
import { uploadImage } from "./cloudinaryService.js";

export const updateFood = async (req, res) => {
  try {
    const { foodId } = req.params;
    const { foodName, price, ingredients } = req.body;

    let imageUrl = null;

    if (req.file) {
      try {
        imageUrl = await uploadImage(req.file.buffer);
      } catch (uploadError) {
        console.error("Error uploading image:", uploadError);
        return res.status(500).send({ message: "Failed to upload image", details: uploadError.message });
      }
    }

    const updateData = {
      foodName,
      price,
      ingredients,
      ...(imageUrl && { image: imageUrl }),
    };

    if (!foodId) {
      return res.status(400).send({ message: "Invalid foodId" });
    }
    const updatedFood = await Food.findByIdAndUpdate(foodId, updateData, { new: true });

    if (!updatedFood) {
      return res.status(404).send({ message: "Food not found" });
    }


    res.status(200).send({
      message: "Food updated successfully",
      food: updatedFood,
    });

  } catch (error) {
    console.error("Error updating Food:", error);
    res.status(500).send({ message: "Internal server error", details: error.message });
  }
};
