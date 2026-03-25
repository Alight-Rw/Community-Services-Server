/** @format */

import { StatusCodes } from "http-status-codes";
import User from "../database/models/users.js";
import { checkClientCanDelete,checkProviderCanDelete } from "../modules/shared/repositories/deletedAccountRepo.js";
import { handleError } from "../utils/responseUtils.js";

export const validateDeleteAccount = async (req, res, next) => {
  try {
    const userId = req.user?._id;

    const user = await User.findById(userId);

    if (!user) {
      return handleError(res, StatusCodes.NOT_FOUND, "User not found");
    }

    req.userData = user;

    if (user.role === "provider") {
      const { canDelete, serviceIds } = await checkProviderCanDelete(userId);

      if (!canDelete) {
        return handleError(
          res,
          StatusCodes.BAD_REQUEST,
          "Cannot delete account: Active services exist"
        );
      }

      req.serviceIds = serviceIds;
    }

    if (user.role === "client") {
      const { canDelete } = await checkClientCanDelete(userId);

      if (!canDelete) {
        return handleError(
          res,
          StatusCodes.BAD_REQUEST,
          "Cannot delete account: Active requests exist"
        );
      }
    }

    next();
  } catch (error) {
    return handleError(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      error.message
    );
  }
};