import { Food } from "../../model/food.model.js";

export const createFood = async (req, res) => {
    try {
      const newFood = new Food(req.body);
      const savedFood = await newFood.save();
      res.status(201).send({ message: "Food created successfully", foodId: savedFood._id });
    } catch (error) {
      console.error("Error creating Food:", error);
      res.status(500).send({ message: "Internal server error" });
    }
  };