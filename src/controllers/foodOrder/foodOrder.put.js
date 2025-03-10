import { foodOrder } from "../../model/foodOrder.model.js";
export const updateOrder = async (req, res) => {
    try {
        const orderData = req.body;
        const { orderId } = req.params;

        const existingOrder = await foodOrder.findByIdAndUpdate(
            orderId,
            orderData, {
            new: true,
        }
        );
        if (!existingOrder) {
            res.status(404).send({ messaga: "Order not found." });
        }
        await existingOrder.save();
        res.status(200).send({ message: "Order updated successfully" })

    } catch (error) {

        res.status(500).send({ message: "updataOrder:internal server error" })

    }
}

