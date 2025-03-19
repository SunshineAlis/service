import { Food } from "../../model/food.model.js";

export const getFoodCountByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    if (!categoryId) {
      return res.status(400).send({ message: "Category ID is required" });
    }
    const foodCount = await Food.countDocuments({ category: categoryId });
    res.status(200).send({
      message: "Current category food count fetched",
      count: foodCount,
    });
  } catch (error) {
    console.error("Error fetching current category food count:", error);
    res.status(500).send({ message: "Server error" });
  }
};

export const getAllFoodCounts = async (req, res) => {
  try {
    const allFoodCounts = await Food.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);
    res
      .status(200)
      .send({ message: "food count fetched", data: allFoodCounts });
  } catch (error) {
    console.error("Error fetching food count:", error);
    res.status(500).send({ message: "Server error" });
  }
};

export const categoryFoods = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    console.log("Category ID from URL:", categoryId);
    if (!categoryId) {
      return res.status(400).send({ message: "Category ID is required" });
    }
    const foods = await Food.find({ category: categoryId });

    res.status(200).send({ message: "Foods fetched successfully", foods });
  } catch (error) {
    console.error("Error fetching foods:", error);
    res.status(500).send({ message: "Server error" });
  }
};

export const getAllFoodCount = async (req, res) => {
  try {
    const allFoodCounts = await Food.aggregate([
      {
        $group: {
          _id: "$category", // Категори дээр группчилна
          count: { $sum: 1 }, // Категорийн тоо нэмэгдэнэ
        },
      },
      {
        $lookup: {
          from: "categories", // Категориудын нэрээс мэдээлэл авах
          localField: "_id", // "_id" нь category-ийн ID
          foreignField: "_id", // "categories" коллекц доторх _id-тай тохируулах
          as: "categoryInfo", // Нэрийн мэдээлэл авах
        },
      },
      {
        $unwind: "$categoryInfo", // lookup-ээс авсан мэдээллийг хэвийн нэгэн обьект болгох
      },
      {
        $project: {
          categoryId: "$_id", // Категориын ID-г categoryId гэж нэрлэх
          categoryName: "$categoryInfo.name", // Нэрийг categoryInfo.name гэж нэрлэх
          count: 1, // count-г мөн хадгалах
          _id: 0, // ID-г гаргахгүй
        },
      },
    ]);

    res.status(200).send({
      message: "Food count fetched successfully",
      counts: allFoodCounts, // Категориудын тоог буцаана
    });
  } catch (error) {
    console.error("Error fetching food count:", error);
    res.status(500).send({ message: "Server error" });
  }
};
