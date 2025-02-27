import { Category } from "../../model/categories.model.js";

export const createCategory = async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    const savedCategory = await newCategory.save();

    res.status(201).send({
      message: "Category created successfully",
      categoryId: savedCategory._id,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};
