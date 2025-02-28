import { foodOrderItem } from "../../model/foodOrderItem.model.js";

export const updatOrderItem = async (req, res) => {
    try {
        const { orderItemId } = req.params;
        const orderItemData = req.body;

        const existingOrderItem = await foodOrderItem.findByIdAndUpdate(
            orderItemId,
            orderItemData, {
            new: true,
        }
        );
        if (!existingOrderItem) {
            res.status(400).send({ message: "Order not found" });
        }
        await existingOrderItem.save();
        res.status(200).send({ message: "Order updated successfully" })
    } catch (error) {
        res.status(500).send({ message: "Internal server error" })

    }
}