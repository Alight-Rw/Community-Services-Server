
import { StatusCodes } from "http-status-codes";
import { findCategory } from "../modules/shared/repositories/categortRepositories.js";
import { handleError } from "../utils/responseUtils.js";

const categoryExist = async (req, res, next) => {

    try {
        const category = await findCategory(req.body.categoryName);

        if (category) {
            return handleError(res, StatusCodes.CONFLICT, "category already exists")
        }
        next();
    } catch (error) {
        return handleError(res, StatusCodes.INTERNAL_SERVER_ERROR,error.message)
    }
}
export { categoryExist }