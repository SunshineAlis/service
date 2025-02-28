import { foodOrder } from "../../model/foodOrder.model";
export const deleteOrder = async (req, res) => {
    try {
        const orderData = req.body;
        const { orderId } = req.params;

        const existingOrder = await foodOrder.findByIdAndDelete(
            orderId,
            orderData, {
            new: true,
        }
        );
        if (!existingOrder) {
            res.status(404).send({ messaga: "Order not found." });
        }
        await existingOrder.save();
        res.status(200).send({ message: "order deleted successfully" })

    } catch (error) {

        res.status(500).send({ message: "deleteOrder:Internal server error" })

    }
}