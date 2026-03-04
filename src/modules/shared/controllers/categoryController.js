import { StatusCodes } from "http-status-codes";
import { handleError, handleSuccess } from "../../../utils/responseUtils.js";
import { 
  findCategory, 
  createCategory as createCategoryRepo, getAllCategories } from "../repositories/categortRepositories.js";

export const createCategory = async (req, res) => {
  try {
    const existing = await findCategory(req.body.categoryName);

    if (existing) { 
      return handleError(res, StatusCodes.CONFLICT,"Category already exists" );
    }

    const newCategory = await createCategoryRepo(req.body);

    return handleSuccess( res, StatusCodes.CREATED,"Category created successfully", newCategory);

  } catch (error) { return handleError( res, StatusCodes.INTERNAL_SERVER_ERROR, error.message );
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await getAllCategories();
return handleError (res,StatusCodes.CONFLICT, "category not found");
    return handleSuccess( res, StatusCodes.OK,"Categories fetched successfully", categories );

  } catch (error) {
    return handleError( res, StatusCodes.INTERNAL_SERVER_ERROR,error.message );
  }
};