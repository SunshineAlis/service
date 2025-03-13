import { Category } from "../../model/categories.model.js";


export const getCategory = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).send({
            message: "Fetched all categories",
            data: categories
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Server error" });
    }
};


