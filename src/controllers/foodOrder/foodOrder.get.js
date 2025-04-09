import { FoodOrder } from "../../model/foodOrder.model.js";

export const getOrders = async (req, res) => {
    try {
        const orders = await FoodOrder.aggregate([
            { $unwind: "$items" },
            {
                $lookup: {
                    from: "foods",
                    localField: "items.foodId",
                    foreignField: "_id",
                    as: "foodDetails"
                }
            },
            {
                $unwind: {
                    path: "$foodDetails",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    _id: 1,
                    email: "$contactInfo.email",
                    phone: "$contactInfo.phone",
                    address: "$contactInfo.address",
                    food: {
                        foodName: "$items.foodName",
                        categoryName: "$foodDetails.categoryName",
                        image: "$foodDetails.image",
                        quantity: "$items.quantity",
                        unitPrice: "$items.price",
                        total: { $multiply: ["$items.quantity", "$items.price"] }
                    },
                    orderTotal: { $multiply: ["$items.quantity", "$items.price"] },
                    orderStatus: "$status",
                    createdAt: 1
                }
            },
            {
                $group: {
                    _id: "$_id",
                    email: { $first: "$email" },
                    phone: { $first: "$phone" },
                    address: { $first: "$address" },
                    foodList: { $push: "$food" },
                    orderTotal: { $sum: "$orderTotal" },
                    orderStatus: { $first: "$orderStatus" },
                    createdAt: { $first: "$createdAt" }
                }
            },
            {
                $group: {
                    _id: "$email",
                    orders: {
                        $push: {
                            _id: "$_id",
                            phone: "$phone",
                            address: "$address",
                            foodList: "$foodList",
                            orderTotal: "$orderTotal",
                            orderStatus: "$orderStatus",
                            createdAt: "$createdAt"
                        }
                    },
                    totalSpent: { $sum: "$orderTotal" }
                }
            },
            {
                $project: {
                    _id: 0,
                    email: "$_id",
                    orders: 1,
                    totalSpent: 1
                }
            },
            {
                $sort: { "orders.createdAt": -1 }
            }
        ]);

        res.status(200).send({
            success: true,
            message: "Success",
            data: orders
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "error",
            error: error.message
        });
    }
};


export const getClientOrderHistory = async (req, res) => {
    try {

        const { email } = req.body;
        console.log(email);
        const orders = await FoodOrder.aggregate([
            { $unwind: "$items" },
            {
                $lookup: {
                    from: "foods",
                    localField: "items.foodId",
                    foreignField: "_id",
                    as: "foodDetails"
                }
            },
            {
                $unwind: {
                    path: "$foodDetails",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    _id: 1,
                    email: "$contactInfo.email",
                    phone: "$contactInfo.phone",
                    address: "$contactInfo.address",
                    food: {
                        foodName: "$items.foodName",
                        categoryName: "$foodDetails.categoryName",
                        image: "$foodDetails.image",
                        quantity: "$items.quantity",
                        unitPrice: "$items.price",
                        total: { $multiply: ["$items.quantity", "$items.price"] }
                    },
                    orderTotal: { $multiply: ["$items.quantity", "$items.price"] },
                    orderStatus: "$status",
                    createdAt: 1
                }
            },
            {
                $match: { email: email }
            },
            {
                $group: {
                    _id: "$_id",
                    email: { $first: "$email" },
                    phone: { $first: "$phone" },
                    address: { $first: "$address" },
                    foodList: { $push: "$food" },
                    orderTotal: { $sum: "$orderTotal" },
                    orderStatus: { $first: "$orderStatus" },
                    createdAt: { $first: "$createdAt" }
                }
            },
            {
                $sort: { "createdAt": -1 }
            }
        ]);

        if (orders.length > 0) {
            res.status(200).send({
                success: true,
                message: "Амжилттай",
                data: orders
            });
        } else {
            res.status(404).send({
                success: false,
                message: "Захиалгаа олж чадсангүй."
            });
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Алдаа гарлаа.",
            error: error.message
        });
    }
};









