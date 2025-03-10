import { Category } from "../../model/categories.model.js";
import { Food } from "../../model/food.model.js";

export const getCategory = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getFoodsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const foodCount = await Food.countDocuments({ category: categoryId });
        res.json({ foodCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};