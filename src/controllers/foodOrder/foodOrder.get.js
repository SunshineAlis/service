import { foodOrder } from "../../model/foodOrder.model.js";


export const getOrders = async (req, res) => {
    try {
        const orders = await foodOrder.find()
            .populate("user", "name email phone address")
            .populate("food", "name price category");
        res.status(200).send({
            message: "Orders fetched successfully",
            orders,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Server error" });
    }
};
