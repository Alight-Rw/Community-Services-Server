import { StatusCodes } from "http-status-codes";
import User from "../../../database/models/users.js";
import { handleError, handleSuccess } from "../../../utils/responseUtils.js";

export const deleteAccount = async (req, res) => {
  try {

    const userId = req.userId.id;

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return handleError(res, StatusCodes.NOT_FOUND, "User not found");
    }

    return handleSuccess(res, StatusCodes.OK, "Account deleted successfully", {});

  } catch (error) {
    return handleError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};