/** @format */

import { StatusCodes } from "http-status-codes";
import { deleteProviderData,deleteClientData } from "../repositories/deletedAccountRepo.js";
import { handleError,handleSuccess } from "../../../utils/responseUtils.js";

export const deleteAccount = async (req, res) => {
  try {
    const userId = req.user?._id;
    const user = req.userData;

    if (user.role === "provider") {
      await deleteProviderData(userId, req.serviceIds);

      return handleSuccess(
        res,
        StatusCodes.OK,
        "Provider account deleted successfully",
        {}
      );
    }

    if (user.role === "client") {
      await deleteClientData(userId);

      return handleSuccess(
        res,
        StatusCodes.OK,
        "Client account deleted successfully",
        {}
      );
    }

  } catch (error) {
    return handleError(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      error.message
    );
  }
};