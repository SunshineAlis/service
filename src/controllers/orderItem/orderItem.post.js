import { foodOrderItem } from "../../model/foodOrderItem.model.js";

export const createOrderItem = async (req, res) => {
    try {
        const newOrderItem = foodOrderItem.req.body
        const savedOrderItem = await newOrderItem.save();

        res.status(200).send({
            message: "Food order item created successfully",
            orderItemId: savedOrderItem._id,
        });
    } catch (error) {
        res.status(500).send({ message: "Internal server error" })


    }
}