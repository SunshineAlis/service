import { Category } from "../../model/categories.model.js";

export const deleteCategory = async (req, res) => {
  try {
    const categoryData = req.body;
    const { categoryId } = req.params;

    const existingCategory = await Category.findByIdAndDelete(
      categoryId,
      categoryData,
      {
        new: true,
      }
    );
    if (!existingCategory) {
      return res.status(404).send({ message: "Category not found" });
    }
    console.log("Category deleted successfully:", existingCategory);
    res.status(200).send({
      message: "Category updated successfully;",
      categoryData: existingCategory,
    });
  } catch (error) {
    console.error("Error deleted category:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};
