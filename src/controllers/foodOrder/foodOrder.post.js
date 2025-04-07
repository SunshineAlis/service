import { FoodOrder } from "../../model/foodOrder.model.js"
export const createOrder = async (req, res) => {
    try {
        console.log("Received:", req.body);
        const { user, contactInfo, items } = req.body;

        if (!contactInfo?.email || !contactInfo?.phone || !contactInfo?.address) {
            return res.status(400).send({
                success: false,
                message: "Email, address,phone must be required"
            });
        }

        if (!items || items.length === 0) {
            return res.status(400).send({
                success: false,
                message: "order list empty"
            });
        }
        const newOrder = new FoodOrder({
            user: user || null,
            contactInfo,
            items: items.map(item => ({
                foodId: item.foodId,
                foodName: item.foodName,
                price: item.price,
                quantity: item.quantity
            })),
            status: "PENDING",
            totalAmount: items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        });

        const savedOrder = await newOrder.save();

        res.status(201).send({
            success: true,
            message: "success",
            order: savedOrder
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "error!",
            error: error.message
        });
    }
};








