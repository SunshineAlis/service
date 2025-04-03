import { foodOrder } from "../../model/foodOrder.model.js"
import { User } from "../../model/user.model.js";
import mongoose from "mongoose";

export const createOrder = async (req, res) => {

    try {
        const newOrder = new foodOrder((req.body));
        const savedOrder = await newOrder.save();
        res.status(201).send({
            message: "Food order created successfully",
            orderId: savedOrder._id
        });

    }
    catch (error) {
        console.error("createOrder error:", error);
        res.status(500).send({ message: "Internal server error", error: error.message });
    }
}




// export const createOrder = async (req, res) => {
//     try {
//         const { email, foodCategory, userId } = req.query;
//         const { totalPrice, foodOrderItem, status, image } = req.body;

//         if (!email || !userId || !foodCategory) {
//             return res.status(400).send({ message: "Email, User ID, and Food Category are required" });
//         }

//         if (!mongoose.Types.ObjectId.isValid(userId)) {
//             return res.status(400).json({ message: "Invalid User ID" });
//         }


//         for (let item of foodOrderItem) {
//             if (!mongoose.Types.ObjectId.isValid(item.food)) {
//                 return res.status(400).json({ message: `Invalid food ID: ${item.food}` });
//             }
//         }

//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         const newOrder = new foodOrder({
//             user: user._id,
//             totalPrice,
//             foodOrderItem,
//             status,
//             image,
//             category: foodCategory,
//         });

//         const savedOrder = await newOrder.save();
//         res.status(201).json({
//             message: "Food order created successfully",
//             orderId: savedOrder._id,
//         });

//     } catch (error) {
//         console.error("createOrder error:", error);
//         res.status(500).json({ message: "Internal server error", error: error.message });
//     }
// };








