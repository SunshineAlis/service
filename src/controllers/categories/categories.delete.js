import { Category } from "../../model/categories.model.js";

export const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully", deletedCategory });
  } catch (error) {
    res.status(500).json({ message: "Error deleting category", error });
  }
};
