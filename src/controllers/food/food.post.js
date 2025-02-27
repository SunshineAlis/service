import { Food } from "../../model/food.model.js";

export const createFood = async (req, res) => {
    try {
        console.log("Received Data:", req.body); //

        const { foodName, price, image, ingredients, updateAt, category } = req.body;

        const newFood = new Food({
            foodName,
            price,
            image,
            ingredients,
            updateAt: updateAt || Date.now(),
            category
        });
        await newFood.save();
        console.log("Food saved successfully:", newFood);
        res.status(201).send({ message: "Food created successfully" });
    } catch (error) {
        console.error("Error creating Food:", error);
        res.status(500).send({ message: "Internal server error" });
    }
};



