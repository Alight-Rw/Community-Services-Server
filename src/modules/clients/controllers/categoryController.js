import Category from "../../../database/models/Category.js";

export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    // 1. Reba niba category isanzwe ihari
    const existing = await Category.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const newCategory = await Category.create({ name, description });

  
    return res.status(201).json({
      message: "Category created successfully",
      category: newCategory,
    });

  } catch (error) {
    
    return res.status(500).json({ message: `Error: ${error.message}` });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json({
      message: "Categories fetched successfully",
      categories,
    });
  } catch (error) {
    return res.status(500).json({ message: `Error: ${error.message}` });
  }
};
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params; // Twakura ID muri URL (e.g., /api/v1/categories/123)
    const { name, description } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, description },
      { new: true, runValidators: true } // 'new: true' ituma iduha data nshya imaze guhinduka
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json({
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    return res.status(500).json({ message: `Error: ${error.message}` });
  }
};

// 2. GUSIBA (DELETE) CATEGORY
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: `Error: ${error.message}` });
  }
};