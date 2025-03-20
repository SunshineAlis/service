import { foodOrder } from "../../model/foodOrder.model.js";

export const getOrders = async (req, res) => {
    try {
        const { categoryId } = req.query;

        const filter = categoryId ? { category: categoryId } : {};

        const orders = await foodOrder.find(filter);

        res.status(200).send({ message: "Orders fetched successfully", orders });
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).send({ message: "Server error" });
    }
};
