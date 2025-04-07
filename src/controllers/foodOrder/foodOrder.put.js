import { FoodOrder } from "../../model/foodOrder.model.js";

export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { orderStatus } = req.body;

        const validStatuses = ["pending", "processing", "completed", "cancelled"];
        if (!validStatuses.includes(orderStatus)) {
            return res.status(400).send({
                success: false,
                message: "Invalid status value"
            });
        }

        const updatedOrder = await FoodOrder.findByIdAndUpdate(
            id,
            { status: orderStatus },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).send({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).send({
            success: true,
            message: "Order status updated successfully",
            data: updatedOrder
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error updating order status",
            error: error.message
        });
    }
};
