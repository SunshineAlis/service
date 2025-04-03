import { Category } from "../../model/categories.model.js";

export const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return res.status(404).send({ message: "Category not found" });
    }

    res.status(200).send({ message: "Category deleted successfully", deletedCategory });
  } catch (error) {
    res.status(500).send({ message: "Error deleting category", error });
  }
};
