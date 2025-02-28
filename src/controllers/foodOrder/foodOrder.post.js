import { foodOrder } from "../../model/foodOrder.model.js"


export const createOrder = async (req, res) => {

    try {
        const newOrder = new foodOrder((req.body));
        const savedOrder = await newOrder.save();
        res.status(201).send({
            messaga: "Food order created successfully",
            orderId: savedOrder._id
        });

    }
    catch (error) {

        res.status(500).send({ message: "createOrder:Internal server error" })

    }
}








