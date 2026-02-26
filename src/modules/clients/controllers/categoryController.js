/** @format */
import Category from "../../../database/models/Category.js";

export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    
    if (!name) {
      return res.status(400).json({ 
        success: false, 
        message: "Izina rya category (name) ni itegeko!" 
      });
    }

    const existing = await Category.findOne({ name: { $regex: new RegExp(`^${name}$`, "i") } });
    if (existing) {
      return res.status(400).json({ 
        success: false, 
        message: "Iyi category isanzwe ihari (Already exists)" 
      });
    }


    const newCategory = await Category.create({ 
      name: name.trim(), 
      description: description ? description.trim() : "" 
    });

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      category: newCategory,
    });

  } catch (error) {
    return res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 }); 
    
    return res.status(200).json({
      success: true,
      count: categories.length,
      message: "Categories fetched successfully",
      categories,
    });
  } catch (error) {
    return res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};