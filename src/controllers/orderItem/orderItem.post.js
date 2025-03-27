// import { foodOrderItem } from "../../model/foodOrderItem.model.js";

// export const createOrderItem = async (req, res) => {
//     try {
//         console.log("Received request:", req.body);
//         const { food, quantity, category } = req.body;
//         if (!food || !quantity) {
//             return res.status(400).json({ error: "Food and quantity are required" });
//         }

//         const newOrderItem = new foodOrderItem({ food, quantity, category });
//         await newOrderItem.save();
//         res.status(201).json(newOrderItem);
//     } catch (error) {
//         console.error("Order item creation error:", error);
//         res.status(500).json({ error: "Server error" });
//     }
// }

import mongoose from 'mongoose';
import { foodOrderItem } from "../../model/foodOrderItem.model.js";

export const createOrderItem = async (req, res) => {
    try {
        console.log("Received request:", req.body);
        const { food, quantity, category } = req.body;

        // Validate required fields
        if (!food || !quantity) {
            return res.status(400).json({ error: "Food and quantity are required" });
        }

        // Validate ObjectId for food and category (if provided)
        if (!mongoose.Types.ObjectId.isValid(food)) {
            return res.status(400).json({ error: "Invalid food ID" });
        }

        if (category && !mongoose.Types.ObjectId.isValid(category)) {
            return res.status(400).json({ error: "Invalid category ID" });
        }

        // Create the new order item
        const newOrderItem = new foodOrderItem({ food, quantity, category });
        await newOrderItem.save();

        // Send the created order item as the response
        res.status(201).json(newOrderItem);
    } catch (error) {
        console.error("Order item creation error:", error);
        res.status(500).json({ error: "Server error, unable to create order item", details: error.message });
    }
}
