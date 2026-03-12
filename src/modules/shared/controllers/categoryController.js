import { StatusCodes } from "http-status-codes";
import { handleError, handleSuccess } from "../../../utils/responseUtils.js";
import { createCategory, findCategory, getAllCategories } from "../repositories/categortRepositories.js";

const createCategoryies = async (req, res) => {
  try {
    const {categoryName} = req.body
    const newCategory = await createCategory({categoryName});

    return handleSuccess(res, StatusCodes.CREATED, "Category created successfully", newCategory);

  } catch (error) {
    return handleError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await getAllCategories();
    return handleError(res, StatusCodes.NOT_FOUND, "category not found successfully");
    
    return handleSuccess(res, StatusCodes.OK, "Categories fetched successfully", categories);

  } catch (error) {
    return handleError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

export {createCategoryies,getCategories}