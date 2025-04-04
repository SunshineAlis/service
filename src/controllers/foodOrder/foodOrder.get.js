import { FoodOrder } from "../../model/foodOrder.model.js";

export async function getFoodOrderWithFoodDetails() {
    try {
        const foodOrders = await FoodOrder.aggregate([
            {
                $unwind: "$items" // `items` массивийг нээх
            },
            {
                $lookup: {
                    from: "foods", // "Food" коллекцтой холбогдож байна
                    localField: "items.foodId", // `items.foodId` нь холбогдсон талбар
                    foreignField: "_id", // `Food` коллекцийн `_id` нь холбогдсон талбар
                    as: "foodDetails" // Холбогдсон өгөгдлийг `foodDetails` хэмээн нэрлэх
                }
            },
            {
                $unwind: "$foodDetails" // Холбогдсон хоолны мэдээллүүдийг нэгтгэх
            },
            {
                $project: {
                    "contactInfo": 1,
                    "totalAmount": 1,
                    "status": 1,
                    "foodDetails.foodName": 1,
                    "foodDetails.price": 1,
                    "items.quantity": 1,
                }
            }
        ]);

        console.log(foodOrders);
    } catch (error) {
        console.error("Алдаа гарлаа:", error);
    }
}





const getAllOrders = async (req, res) => {
    try {
        const orders = await FoodOrder
            .find()
            .populate("user", "email phone address") // 关联 User 数据
            .sort({ createdAt: -1 }); // 按时间倒序

        res.status(200).send(orders);
    } catch (error) {
        console.error("获取订单失败:", error);
        res.status(500).send({ message: "获取订单失败！", error: error.message });
    }
};
export default getAllOrders;









// const getAllOrders = async (req, res) => {
//     try {
//         const orders = await foodOrder.find()  // 必须先调用find()
//             .populate({
//                 path: "user",
//                 select: "email phone address",
//             })
//             .populate({
//                 path: "foodOrderItem.food",
//                 model: "Food",  // 确保模型名称正确
//                 select: "foodName price category image", // 使用实际字段名
//                 populate: {
//                     path: "category",
//                     model: "Category",
//                     select: "categoryName",
//                 },
//             });

//         res.status(200).send({ message: "successful", orders });
//     } catch (error) {
//         console.error("Error fetching orders:", error);
//         res.status(500).send({
//             message: "Failed to fetch orders",
//             error: error.message
//         });
//     }
// };
// export default getAllOrders;
