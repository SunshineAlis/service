import { FoodOrder } from "../../model/foodOrder.model.js"
export const createOrder = async (req, res) => {
    try {
        console.log("Хүлээж авсан өгөгдөл:", req.body);
        const { user, contactInfo, items } = req.body;

        // 验证必填字段
        if (!contactInfo?.email || !contactInfo?.phone || !contactInfo?.address) {
            return res.status(400).send({
                success: false,
                message: "Имэйл, утасны дугаар, хаяг заавал шаардлагатай"
            });
        }

        if (!items || items.length === 0) {
            return res.status(400).send({
                success: false,
                message: "Захиалгын жагсаалт хоосон байна"
            });
        }

        // Создать заказ
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
            order: savedOrder
        });

    } catch (error) {
        console.error("Захиалгын үүсгэлтэд алдаа:", error);
        res.status(500).send({
            success: false,
            message: "Захиалга үүсгэхэд алдаа гарлаа!",
            error: error.message
        });
    }
};









// export const createOrder = async (req, res) => {
//     try {
//         const { user, foodOrderItem, totalPrice, status, image, category } = req.body;
//         if (!user || !foodOrderItem || foodOrderItem.length === 0) {
//             return res.status(400).send({ message: "User болон foodOrderItem шаардлагатай!" });
//         }

//         for (const item of foodOrderItem) {
//             if (!item.food) {
//                 return res.status(400).json({ message: "Food ID шаардлагатай!" });
//             }
//         }
//         const newOrder = new foodOrder({
//             user,
//             foodOrderItem,
//             totalPrice,
//             status,
//             image,
//             category,
//         });

//         const savedOrder = await newOrder.save();

//         const populatedOrder = await savedOrder.populate([
//             { path: "user", select: "name email phone address" },
//             {
//                 path: "foodOrderItem.food",
//                 model: "foods",
//                 select: "name price category description image",
//                 populate: { path: "category", model: "categories", select: "name" }
//             }
//         ]);

//         res.status(201).send({
//             message: "Food order created successfully",
//             order: populatedOrder,
//         });

//     } catch (error) {
//         console.error("createOrder error:", error);
//         res.status(500).json({ message: "Internal server error", error: error.message });
//     }
// };



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








