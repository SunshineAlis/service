import { FoodOrder } from "../../model/foodOrder.model.js";

export const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedOrder = await FoodOrder.findByIdAndDelete(id);

        if (!deletedOrder) {
            return res.status(404).send({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).send({
            success: true,
            message: "Order deleted successfully",
            data: deletedOrder
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error deleting order",
            error: error.message
        });
    }
};